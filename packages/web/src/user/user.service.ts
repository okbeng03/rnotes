import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async login({loginName, password}): Promise<User> {
    const user = await this.userRepository.findOne({
      select: [
        'id',
        'loginName',
        'lastName',
        'firstName'
      ],
      where: {
        loginName,
        password
      }
    })

    if (user) {
      return user
    }

    // throw new Error('账号/密码有误！')
    return null
  }

  async register(data: User): Promise<any> {
    try {
      const user = this.userRepository.create(data)

      await this.userRepository.save(user)
      return user.id
    } catch (err) {
      throw err
    }
  }

  // 我的分类
  async category(userId): Promise<any []> {
    const user = await this.userRepository.findOne({
      relations: ['categories'],
      select: [
        'categories'
      ],
      where: {
        id: userId
      }
    })

    // 整成树形结构
    return formatToTree(user.categories || [], null)
  }
}

function formatToTree(ary, pid) {
  return ary
    .filter((item) =>
      // 如果没有父id（第一次递归的时候）将所有父级查询出来
      // 这里认为 item.parentId === 1 就是最顶层 需要根据业务调整
      pid === undefined ? item.parentId === null : item.parentId === pid
    )
    .map((item) => {
      // 通过父节点ID查询所有子节点
      const children = formatToTree(ary, item.id);

      if (children.length) {
        item.children = children;
      }

      return {
        key: item.id,
        ...item
      };
    });
}

import { Controller, Post, Body, HttpException, HttpStatus, Session } from "@nestjs/common";
import { NoteService } from "./note.service";

@Controller('api/note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post('add')
  async add(@Body() noteDto: any) {
    try {
      return await this.noteService.add(noteDto)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @Post('update')
  async update(@Body() noteDto: any) {
    try {
      return await this.noteService.update(noteDto)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @Post('remove')
  async remove(@Body() noteDto: any) {
    try {
      return await this.noteService.remove(noteDto.id)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }
}

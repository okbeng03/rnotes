const href = location.href

document.onselectionchange = () => {
  const selection = window.getSelection()
  const txt = selection.toString()

  if (txt.length) {
    // 弹出操作弹框
    const div = document.createElement('div')
    const newContent = document.createTextNode('Hi there and greetings!')
    div.appendChild(newContent)
    document.body.appendChild(div)

    // 获取节点
    
  }
  console.log(selection.toString(), selection, selection.getRangeAt(0))
}

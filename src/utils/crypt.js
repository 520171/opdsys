const key = 'opd'
const crypto = () => import('crypto')
const aesEncrypt = data => {
  // createCipher函数接收两个参数
  // 第一个参数为 加密方式
  //const ciphers = crypto.getCiphers()
  //console.log(ciphers) // ['aes-128-cbc', 'aes-128-ccm', ...]
  // 通过上述代码 可以获取到crypto支持的所有加密方式
  //第二个参数为加密向量，也称为 加盐（绝对隐私，解密需要用到）

  if ('object' === typeof data) {
    // 当data不为字符串时，将其转换成字符串
    data = JSON.stringify(data)
  }
  const cipher = crypto.createCipher('aes-256-cfb', key)
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  // 将解密的字符串转换成对象
  let result = null
  try {
    result = JSON.parse(encrypted)
  } catch (e) {result = encrypted}
  return result
}

const aesDecrypt = (data) => {
// 解密数据  解密方式要和加密时使用的一致
  const decipher = crypto.createDecipher('aes-256-cfb', key)
  let decrypted = decipher.update(data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
// 将解密的字符串转换成对象
  let result = null
  try {
    result = JSON.parse(decrypted)
  } catch (e) {result = decrypted}
  return result
}

export {
  aesDecrypt,
  aesEncrypt
}

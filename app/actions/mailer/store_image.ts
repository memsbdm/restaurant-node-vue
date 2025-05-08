import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'

type Params = {
  image: MultipartFile
  path: string
}

export default class StoreImage {
  static async handle({ image, path }: Params) {
    const key = `${path}/${cuid()}.${image.extname}`
    await image.moveToDisk(key)
    return image.meta.url
  }
}

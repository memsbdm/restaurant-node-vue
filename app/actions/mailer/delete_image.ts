import drive from '@adonisjs/drive/services/main'

type Params = {
  fileUrl: string
}

export default class DeleteImage {
  static async handle({ fileUrl }: Params) {
    const disk = drive.use()
    await disk.delete(this.#extractKeyFromUrl(fileUrl))
  }

  static #extractKeyFromUrl(url: string) {
    const parsedUrl = new URL(url)
    const path = parsedUrl.pathname

    return path.slice(1)
  }
}

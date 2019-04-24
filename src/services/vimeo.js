import { Vimeo } from 'vimeo'

const client = new Vimeo(
  '9ffd9496a19bc20f69fd31e99cb6715a01c93ec8',
  'U7vMw583tz+VXqfypRjx1obDKiuQiJd2qUOiM7kTtLOPg8pOpXj838I+sM92ZobuGdoQHMuttpAPP57HNZPmk7bQSPBXUD8uVcvpH2HKvSVvQ664CEi8JavBPXX+hlZI',
  '9c773f490fd59071b88039fa2ce8f8b8'
)

export default {
  listAll () {
    return new Promise((resolve, reject) => {
      client.request({ method: 'GET', path: '/me/videos?direction=asc' }, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  upload ({ path, name, description }) {
    return new Promise((resolve, reject) => {
      client.upload(
        path,
        { name, description },
        function (uri) {
          console.log(`Video URI: ${uri}`)
        },
        function (bytesUploaded, bytesTotal) {
          if (bytesUploaded === bytesTotal) {
            resolve()
          }
        },
        function (err) {
          reject(err)
        }
      )
    })
  }
}

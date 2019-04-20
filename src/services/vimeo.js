import { Vimeo } from 'vimeo'

const client = new Vimeo(
  '9ffd9496a19bc20f69fd31e99cb6715a01c93ec8',
  'U7vMw583tz+VXqfypRjx1obDKiuQiJd2qUOiM7kTtLOPg8pOpXj838I+sM92ZobuGdoQHMuttpAPP57HNZPmk7bQSPBXUD8uVcvpH2HKvSVvQ664CEi8JavBPXX+hlZI',
  'b2463787fab5687fb9295f6a9fd79a78'
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
  upload () {
    console.log('OK')
  }
}

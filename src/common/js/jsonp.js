/**
 * Created by wzt on 2017/11/27.
 */
import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if(!err) {
        resoleve(data)
      } else {
        reject(err)
      }
    })
  })
}

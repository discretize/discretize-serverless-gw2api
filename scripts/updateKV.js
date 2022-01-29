require('dotenv').config()

const axios = require('axios')
const skills = require('../src/mappings/skills.json')
const traits = require('../src/mappings/traits.json')
const items = require('../src/mappings/items.json')

const namespaces = {
  skills: `${process.env.CF_NAMESPACE_SKILLS}`,
  traits: '',
  items: '',
}

/**
 *
 * @param {string} type the type of the namespace that should be updated - skills/traits/items
 * @param {func} getKey function that returns the key for a object in values
 * @param {func} getValue function that returns the value for a object in values
 * @param {object[]} values array of objects that should be uploaded
 */
function upload(type, getKey, getValue, values) {
  if (!namespaces[type]) {
    console.error('Invalid namespace provided for type ' + type)
    return
  }
  // how to authorize: https://api.cloudflare.com/#getting-started-requests
  axios({
    method: 'put',
    url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACC_ID}/storage/kv/namespaces/${namespaces[type]}/bulk`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CF_AUTH_TOKEN}`,
    },
    data: JSON.stringify(
      values.map((value) => ({
        key: `${getKey(value)}`,
        value: JSON.stringify(getValue(value)),
      })),
    ),
  }).then((res) => console.log(res))
}
console.log(skills.length)
/*
upload(
  'skills',
  (skill) => skill.id,
  (skill) => skill,
  skills,
)
*/

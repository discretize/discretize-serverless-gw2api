require('dotenv').config()

const axios = require('axios')
const skills_en = require('../src/mappings/skills_en.json')
const skills_zh = require('../src/mappings/skills_zh.json')

const traits_en = require('../src/mappings/traits_en.json')
const items_en = require('../src/mappings/items_en.json')

const namespaces = {
  skills: `${process.env.CF_NAMESPACE_SKILLS_EN}`,
  traits: '',
  items: '',
}

const normalize = (string) =>
  string === undefined
    ? string
    : string
        .replace(/[^A-Za-z]/g, '')
        .toLowerCase()
        .trim()

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

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.CF_AUTH_TOKEN}`,
  }
  const payload = JSON.stringify(
    values.map((value) => ({
      key: `${getKey(value)}`,
      value: JSON.stringify(getValue(value)),
    })),
  )
  // how to authorize: https://api.cloudflare.com/#getting-started-requests
  axios
    .put(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACC_ID}/storage/kv/namespaces/${namespaces[type]}/bulk`,
      payload,
      { headers },
    )
    .then((res) => console.log(res))
}
const toFindDuplicates = (arr) =>
  arr.filter(
    (item, index) =>
      arr.indexOf(
        arr.find((item2) => normalize(item2.name) === normalize(item.name)),
      ) !== index,
  )
const filtered = skills_en.filter((skill) => !!skill.name)
const duplicate = toFindDuplicates(skills_en)

console.log(duplicate)
/*
upload(
  'skills',
  (skill) => normalize(skill.name),
  (skill) => skill,
  skills_en.filter((skill) => !!skill.name),
)
*/

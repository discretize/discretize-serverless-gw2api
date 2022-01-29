const axios = require('axios')
const fs = require('fs')
// contains missing api data
const extendedAPI = require('../src/mappings/extendedAPI.json')

// languages to query the api for
const LANGUAGES = ['en', 'zh']

const MAX_ITEMS_PER_REQUEST = 200
// path to save the files at
const MAPPINGS_PATH = './src/mappings/'

function writeToFile(targetFile, content) {
  fs.writeFile(targetFile, JSON.stringify(content), { flag: 'w+' }, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Successfuly wrote ${targetFile}`)
    }
  })
}
/*
async function fetchSpecializations(lang = 'en') {
  console.log('Fetching specializations...')

  const { data: specializationList } = await axios.get(
    'https://api.guildwars2.com/v2/specializations',
  )

  const { data: specs } = await axios.get(
    `https://api.guildwars2.com/v2/specializations?ids=${specializationList}&lang=${lang}`,
  )

  return specs
}

async function fetchTraits(lang = 'en') {
  console.log('Fetching traits...')

  const { data: traitList } = await axios.get(
    'https://api.guildwars2.com/v2/traits',
  )
  let traits = []
  for (let i = 0; i < traitList.length; i += MAX_ITEMS_PER_REQUEST) {
    const sliced = traitList.slice(i, i + MAX_ITEMS_PER_REQUEST)

    const { data } = await axios.get(
      `https://api.guildwars2.com/v2/traits?ids=${sliced}&lang=${lang}`,
    )
    traits = traits.concat(data)
  }
  console.log(traits.length)

  return traits
}

async function multiLangSpecializations() {
  const apiData = { specializations: {} }
  const promises = LANGUAGES.map((lang) => fetchSpecializations(lang))

  const data = await Promise.all(promises)
  LANGUAGES.forEach((lang, index) => {
    apiData.specializations[lang] = data[index]
  })

  const mergedAPI = apiData.specializations.en.map((spec) => {
    const extraLangs = {}
    LANGUAGES.forEach((lang) => {
      extraLangs[`name_${lang}`] = apiData.specializations[lang].find(
        (spec2) => spec2.id === spec.id,
      ).name
    })
    return { ...spec, ...extraLangs }
  })

  writeToFile(`${MAPPINGS_PATH}specializations.json`, mergedAPI)
}

async function multiLangTraits() {
  const apiData = { traits: {} }
  const promises = LANGUAGES.map((lang) => fetchTraits(lang))

  const data = await Promise.all(promises)
  LANGUAGES.forEach((lang, index) => {
    apiData.traits[lang] = data[index]
  })

  const mergedAPI = apiData.traits.en.map((spec) => {
    const extraLangs = {}
    LANGUAGES.forEach((lang) => {
      extraLangs[`name_${lang}`] = apiData.traits[lang].find(
        (spec2) => spec2.id === spec.id,
      ).name
      extraLangs[`description_${lang}`] = apiData.traits[lang].find(
        (spec2) => spec2.id === spec.id,
      ).description
    })
    return { ...spec, ...extraLangs }
  })

  writeToFile(`${MAPPINGS_PATH}traits.json`, mergedAPI)
}

async function multiLangTraits() {
  const apiData = { traits: {} }
  const promises = LANGUAGES.map((lang) => fetchTraits(lang))

  const data = await Promise.all(promises)
  LANGUAGES.forEach((lang, index) => {
    apiData.traits[lang] = data[index]
  })

  const mergedAPI = apiData.traits.en.map((spec) => {
    const extraLangs = {}
    LANGUAGES.forEach((lang) => {
      extraLangs[`name_${lang}`] = apiData.traits[lang].find(
        (spec2) => spec2.id === spec.id,
      ).name
      extraLangs[`description_${lang}`] = apiData.traits[lang].find(
        (spec2) => spec2.id === spec.id,
      ).description
    })
    return { ...spec, ...extraLangs }
  })

  writeToFile(`${MAPPINGS_PATH}traits.json`, mergedAPI)
}

multiLangSpecializations()
multiLangTraits()
*/

function fetchSpecializations(lang = 'en') {
  console.log('Fetching specializations...')
  // get item stats (affixes)
  axios.get('https://api.guildwars2.com/v2/specializations').then((res) => {
    axios
      .get(`https://api.guildwars2.com/v2/specializations?ids=${res.data}`)
      .then((response) => {
        const specs = response.data

        writeToFile(`${MAPPINGS_PATH}specializations_${lang}.json`, specs)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

function fetchTraits(lang = 'en') {
  console.log('Fetching traits...')
  // get item stats (affixes)
  axios.get('https://api.guildwars2.com/v2/traits').then((res) => {
    const arrayOfArrays = []
    for (let i = 0; i < res.data.length; i += MAX_ITEMS_PER_REQUEST) {
      arrayOfArrays.push(res.data.slice(i, i + MAX_ITEMS_PER_REQUEST))
    }

    const requests = arrayOfArrays.map((arr) =>
      axios.get(`https://api.guildwars2.com/v2/traits?ids=${arr}&lang=${lang}`),
    )
    axios.all(requests).then(
      axios.spread((...responses) => {
        const traits = [
          ...responses
            .flatMap((r) => r.data)
            .map((trait) => ({
              ...trait,
              ...extendedAPI.traits.augments[trait.id],
            })),
          ...extendedAPI.traits.missing,
        ]

        // write to disk
        const targetFile = `${MAPPINGS_PATH}traits_${lang}.json`
        writeToFile(targetFile, traits)
      }),
    )
  })
}

function fetchSkills(lang = 'en') {
  console.log('Fetching skills...')
  // get item stats (affixes)
  axios.get('https://api.guildwars2.com/v2/skills').then((res) => {
    const arrayOfArrays = []
    for (let i = 0; i < res.data.length; i += MAX_ITEMS_PER_REQUEST) {
      arrayOfArrays.push(res.data.slice(i, i + MAX_ITEMS_PER_REQUEST))
    }

    const requests = arrayOfArrays.map((arr) =>
      axios.get(`https://api.guildwars2.com/v2/skills?ids=${arr}&lang=${lang}`),
    )
    axios.all(requests).then(
      axios.spread((...responses) => {
        const skills = [
          ...responses
            .flatMap((r) => r.data)
            .map((skill) => ({
              ...skill,
              ...extendedAPI.skills.augments[skill.id],
            })),
          ...extendedAPI.skills.missing,
        ]

        // write to disk
        const targetFile = `${MAPPINGS_PATH}skills_${lang}.json`
        writeToFile(targetFile, skills)
      }),
    )
  })
}

//TODO implement language awareness
function fetchItems(lang = 'en') {
  console.log('Fetching items...')
  axios
    .get(`https://api.datawars2.ie/gw2/v1/item_data/json`)
    .then((response) => {
      const items = response.data
        .filter((item) => !!item.id)
        .map(
          // filter for the fields from the real api since datawars2 provides more values that are not relevant for us
          ({
            name,
            description,
            type,
            level,
            rarity,
            vendor_value,
            default_skin,
            game_types,
            flags,
            restrictions,
            id,
            chat_link,
            icon,
            details,
          }) => {
            // return item from the extended api in case there exists one
            const extendedItem = extendedAPI.items.override.find(
              (exItem) => exItem.id === id,
            )
            if (extendedItem) return extendedItem

            // else return the api data received from datawars
            return {
              name,
              description,
              type,
              level,
              rarity,
              vendor_value,
              default_skin,
              game_types,
              flags,
              restrictions,
              id,
              chat_link,
              icon,
              details,
              ...extendedAPI.items.augments[id],
            }
          },
        )

      const targetFile = `${MAPPINGS_PATH}items_${lang}.json`
      writeToFile(targetFile, items)
    })
    .catch((error) => {
      console.log(error)
    })
}

LANGUAGES.forEach((lang) => {
  fetchSpecializations(lang)
  fetchTraits(lang)
  fetchSkills(lang)
  fetchItems(lang)
})

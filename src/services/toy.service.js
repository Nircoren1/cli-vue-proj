
import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getLabels,
}

const TOY_KEY = 'toysDB'
const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", 'Battery Powered']

let gToys = _createToys()

function _createToys() {
    let toys = storageService.load(TOY_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                "_id": "t101",
                "name": "Talking Doll",
                "price": 123,
                "labels": ["Doll", "Battery Powered", "Baby"],
                "createdAt": 2313,
                "inStock": true,
                "reviews": [
                    {
                        rate: 5,
                        txt: 'amazing toy'
                    },
                    {
                        rate: 5,
                        txt: 'amazing wawa'
                    },
                ]
            },
            {
                "_id": "t102",
                "name": "wawa",
                "price": 100,
                "labels": ["Doll", "Battery Powered", "Baby"],
                "createdAt": 1631031801,
                "inStock": true,
                "reviews": [
                    {
                        rate: 1,
                        txt: 'bad toy'
                    },
                    {
                        rate: 2,
                        txt: 'awful'
                    },
                ]
            },
            {
                "_id": "t103",
                "name": "Doll 3",
                "price": 20,
                "labels": ["Doll", "Baby"],
                "createdAt": 123321,
                "inStock": true,
                "reviews": [
                    {
                        rate: 1,
                        txt: 'bad toy'
                    },
                    {
                        rate: 2,
                        txt: 'awful'
                    },
                ]
            },

        ]
        storageService.store(TOY_KEY, toys)
    }
    return toys
}


function query(filterBy) {
    let toys = JSON.parse(JSON.stringify(gToys))
    toys = toys.filter(toy => {
        return toy.name.toLowerCase().includes(filterBy.name.toLowerCase()) &&
            filterBy.inStock ? toy.inStock : true &&
                filterBy.labels.length ? filterBy.labels.every(label => toy.labels.includes(label)) : true
    })
    if (filterBy.sortBy) {
        const sortBy = filterBy.sortBy
        toys.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(toys) }, 500)
    })
}

function getById(id) {
    const toy = gToys.find(toy => toy._id === id)
    return Promise.resolve(toy)
}

function remove(id) {
    const idx = gToys.findIndex(toy => toy._id === id)
    gToys.splice(idx, 1)
    utilService.saveToStorage(TOY_KEY, gToys)
    return Promise.resolve()
}

function save(toy) {
    const toyToSave = JSON.parse(JSON.stringify(toy))
    const savedToy = (toyToSave._id) ? _update(toyToSave) : _add(toyToSave)

    utilService.saveToStorage(TOY_KEY, gToys)
    return Promise.resolve(savedToy)
}


function _add(toy) {
    toy._id = utilService.makeId()
    gToys.push(toy)
    return toy
}

function _update(toy) {
    const idx = gToys.findIndex(currProduct => currProduct._id === toy._id)
    gToys.splice(idx, 1, toy)
    return toy
}

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        price: 100,
        "labels": [],
        "createdAt": new Date().getTime(),
        "inStock": true,
        "reviews": []

    }
}

function getLabels() {
    return Promise.resolve(labels)
}
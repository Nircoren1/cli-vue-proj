
import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyProduct
}

const TOY_KEY = 'toysDB'
const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle","Outdoor"]

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
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "_id": "t102",
                "name": "Talking Doll",
                "price": 123,
                "labels": ["Doll", "Battery Powered", "Baby"],
                "createdAt": 1631031801011,
                "inStock": true
            },

        ]
        storageService.store(TOY_KEY, toys)
    }
    return toys
}


function query() {
    const toys = JSON.parse(JSON.stringify(gToys))
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

function getEmptyProduct() {
    return {
        _id: '',
        name: '',
        price: 100
    }
}

import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getLabels,
}

const TOY_KEY = 'toysDB'
const TOY_URL = 'toy/'

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", 'Battery Powered']

let gToys = _createToys()

function query(filterBy) {
   
    return httpService.get(TOY_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(TOY_URL + toyId)
}

function remove(toyId) {
    const idx = gToys.findIndex(toy => toy._id === toyId)
    gToys.splice(idx, 1)
    utilService.saveToStorage(TOY_KEY, gToys)
    return httpService.delete(TOY_URL + toyId)
}

function save(toy) {

    if (toy._id) return httpService.put(TOY_URL + toy._id, toy)
    return httpService.post(TOY_URL, toy)
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

function getLabels() {
    return Promise.resolve(labels)
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

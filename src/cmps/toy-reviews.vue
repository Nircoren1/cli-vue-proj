<template>
    <h3>Reviews:</h3>
    <ul>
        <li v-for="review in toy.reviews">
            <p>{{review.rate}} stars</p>
            <p>{{review.txt}}</p>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        toy: {
            type: Object,
            required: true,
            default: 'No Reviews',
            validator(toy) {
                return toy && toy.length
            },
        },
    }
}
</script>
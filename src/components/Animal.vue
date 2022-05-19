<script setup>
    import { ref } from 'vue'

    const animal = ref(null)
    const revealed = ref(false)
    const refreshing = ref(false)

    const next = () => {
        revealed.value = false
        refresh()
    }

    const refresh = async () => {
        refreshing.value = true
        await fetch('/api')
            .then(resp => resp.json())
            .then(data => animal.value = data).finally(() => refreshing.value = false)
    }

    await refresh()
</script>

<template>

    <div class="text-center">
        <template v-if="!revealed">
            <h1 class="text-2xl m-4">Your guess?</h1>
            <button  @click="revealed = true"
                     class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">Reveal
            </button>
        </template>


        <template v-if="revealed">
            <span class="text-2xl m-4">{{ animal.name }}</span>
            <p class="italic">{{animal.latin_name}}</p>
        </template>


        <img v-if="!refreshing" :src="animal.image_link" class="max-w-2xl max-h-2xl m-auto my-6">

        <template v-if="revealed">
            <ul class="m-4">
                <li><strong>Type:</strong> {{animal.animal_type}}</li>
                <li><strong>Aktivtid:</strong> {{animal.active_time}}</li>
                <li><strong>Leveområdet:</strong> {{animal.habitat}}</li>
                <li><strong>Diet:</strong> {{animal.diet}}</li>
                <li><strong>Området:</strong> {{animal.geo_range}}</li>
                <li><strong>Maks vekt:</strong> {{animal.weight_max}}kg</li>
                <li><strong>Maks lengde:</strong> {{animal.length_max}}m</li>
                <li><strong>Levealder:</strong> {{animal.lifespan}}år</li>
            </ul>
            <button   @click="next" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">Next
                Animal
            </button>
        </template>

    </div>
</template>
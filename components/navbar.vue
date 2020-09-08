<template>
  <nav class="py-6">
    <div class="container mx-auto flex items-center justify-between flex-wrap ">
      <div class="flex items-center flex-shrink-0 mr-6">
        <span class="font-semibold text-xl tracking-tight">Arfa Summary</span>
      </div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto">
        <div class="text-sm">
          <nuxt-link to="/" class="inline-block font-bold text-sm px-4 py-2 rounded hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
            Beranda
          </nuxt-link>
          <nuxt-link to="/about" class="inline-block text-sm px-4 py-2 rounded hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
            Tentang
          </nuxt-link>
          <nuxt-link to="/help" class="inline-block text-sm px-4 py-2 rounded hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
            Bantuan
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>

<template>
  <nav class="py-6">
    <div class="container mx-auto flex items-center justify-between flex-wrap">
      <div class="flex items-center flex-shrink-0 mr-6">
        <span class="font-semibold text-xl tracking-tight">Arfa Summary</span>
      </div>
      <label for="menu-toggle" class="cursor-pointer lg:hidden block p-2">
        <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <input id="menu-toggle" type="checkbox" class="hidden">
      <div id="menu" class="hidden lg:flex lg:items-center lg:w-auto w-full text-sm">
        <nuxt-link to="/" class="inline-block text-sm px-4 py-2 rounded hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
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
  </nav>
</template>

<script>
export default {

}
</script>

<style>
  .nuxt-link-exact-active {
    font-weight: bold;
  }
  #menu-toggle:checked + #menu {
    display: block;
  }
</style>

<template>
  <div class="container mx-auto">
    <div class="card mb-10">
      <div id="description" class="mb-5">
        <h1 class="text-center font-bold text-lg lg:text-2xl text-teal-400 uppercase mb-3">
          Tentang Website
        </h1>
        <p class="text-sm lg:text-lg text-center">
          <span class="font-bold">Arfa Summary</span> adalah sebuah website untuk meringkas buku digital berformat PDF secara otomatis.
          Website ini dikembangkan untuk memenuhi skripsi yang berjudul <span class="font-bold">Implementasi Algoritma Textrank dalam Automatic Text Summarization pada Buku Digital Berbahasa Indonesia untuk Meningkatkan Kognitif Pembaca</span>.
        </p>
      </div>
      <div id="team" class="mb-5">
        <h1 class="text-center font-bold text-lg lg:text-2xl text-teal-400 uppercase mb-3">
          Tim Pengembang
        </h1>
        <div class="flex flex-col lg:flex-row">
          <div v-for="team in teams" :key="team.id" class="flex-1 flex flex-col items-center space-y-2">
            <img :src="team.photo" :alt="team.name" class="p-2 w-32 h-32 lg:w-40 lg:h-40 rounded-full mt-3 mb-2 border-2 border-teal-400">
            <h5 class="font-bold text-sm lg:text-lg text-center">
              {{ team.name }}
            </h5>
            <h6 class="font-bold text-xs lg:text-sm text-center text-teal-400">
              {{ team.title }}
            </h6>
          </div>
        </div>
      </div>
      <div id="copyright">
        <hr>
        <p class="text-center text-gray-500 font-bold text-xs mt-5">
          <span class="block">
            NIM:160535611821 - S1 Teknik Informatika - Universitas Negeri Malang
          </span>
          &copy; 2020
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    teams: [
      {
        id: 1,
        name: 'M. Fandi Arfabuma',
        title: 'Mahasiswa S1 Teknik Informatika',
        photo: require('~/assets/images/fandi.jpg')
      },
      {
        id: 2,
        name: 'Dr. Eng. Muhammad Ashar, S.T., M.T.',
        title: 'Dosen Pembimbing I',
        photo: require('~/assets/images/ashar.jpg')
      },
      {
        id: 3,
        name: 'Agusta Rakhmat Taufani, S.T., M.T.',
        title: 'Dosen Pembimbing II',
        photo: require('~/assets/images/agusta.jpg')
      }
    ]
  })
}
</script>

<style>

</style>

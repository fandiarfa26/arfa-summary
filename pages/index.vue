<template>
  <div class="container mx-auto">
    <div class="flex flex-col lg:flex-row -mx-2">
      <div class="w-full lg:w-1/3 flex flex-col px-2 order-2 lg:order-1" :class="{ avoid_clicks: inputDisabled }">
        <div class="card">
          <span class="card-title mb-2 text-sm lg:text-base">Pilih contoh buku berikut:</span>
          <div class="px-4 py-2 rounded-lg flex justify-between items-center cursor-pointer bg-teal-400 border-4 border-teal-500 hover:border-transparent hover:shadow-lg" @click="bookCollapsed = !bookCollapsed">
            <span class="font-bold text-white text-sm lg:text-base" v-text="labelSelect" />
            <svg class="text-white w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div :class="{ hidden: bookCollapsed}">
            <div
              v-for="book in books"
              :key="book.id"
              class="text-sm lg:text-base mt-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-400 border-4 border-gray-500 hover:border-transparent hover:shadow-lg"
              @click="chooseBook(book)"
            >
              {{ book.shortTitle }}
            </div>
          </div>
        </div>
        <div class="text-center font-bold my-2 text-gray-600">
          -- atau --
        </div>
        <div class="card mb-3">
          <span class="card-title mb-2 text-sm lg:text-base">Unggah File PDF</span>
          <div class="bg-blue-200 border-4 border-blue-400 p-2 rounded-lg text-xs lg:text-sm">
            <strong>Informasi!</strong> File PDF yang akan diunggah, perlu dilakukan proses seleksi, sehingga hanya tersisa teks yang akan diringkas.
          </div>
          <div class="bg-gray-400 border-4 border-dashed border-gray-500 rounded-lg text-center cursor-pointer py-6 mt-2 font-bold text-gray-500 hover:bg-teal-400 hover:border-teal-500 hover:text-white" @click="$refs.file.click()">
            <span v-text="labelFileName" />
          </div>
          <input ref="file" type="file" class="hidden" accept="application/pdf" @change="uploadPdf">
        </div>
      </div>
      <div class="w-full lg:w-2/3 flex flex-col px-2 order-1 lg:order-2">
        <div v-if="showIdleCard" class="card mb-3">
          <h2 class="font-bold text-xl lg:text-3xl text-center">
            Selamat Datang di <span class="text-teal-500">Arfa Summary</span>
          </h2>
          <p class="text-sm lg:text-lg text-center text-gray-600">
            Sebuah website untuk meringkas buku digital berformat PDF secara otomatis.<br>
            Website ini berfungsi untuk mendapatkan rangkuman dengan cepat.
          </p>
          <img src="~/assets/images/idle.svg" alt="" class="w-2/3 mx-auto mt-10">
        </div>
        <div v-if="showPreviewCard" class="card mb-3">
          <div class="flex justify-between items-center">
            <div class="card-title text-sm lg:text-base">
              Pratinjau <span class="text-teal-500" v-text="bookTitle" />
            </div>
            <span class="cursor-pointer" @click="previewCollapsed = !previewCollapsed">
              <svg
                v-if="!previewCollapsed"
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
              <svg
                v-if="previewCollapsed"
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </span>
          </div>
          <div class="mt-2" :class="{ hidden: !previewCollapsed }">
            <embed v-if="blobPdf !== null" :src="blobPdf" type="application/pdf" class="w-full" style="min-height: 50vh">
            <div v-if="author !== ''" class="flex justify-start items-end mt-3">
              <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span class="text-xs lg:text-sm font-bold" v-text="author" />
            </div>
            <button
              v-if="showSummaryButton"
              type="button"
              class="mt-3 text-sm lg:text-base text-center w-full bg-teal-400 border-4 border-teal-500 hover:border-transparent hover:shadow-lg rounded-lg font-bold text-white py-1"
              @click="(summaryMode === 'choose') ? chooseSummarizing() : uploadSummarizing()"
            >
              Meringkas
            </button>
          </div>
        </div>
        <div v-if="showResultCard" class="card mb-3">
          <div class="card-title mb-2 text-sm lg:text-base">
            Hasil Resume <span class="text-teal-500" v-text="bookTitle" />
          </div>
          <Loading v-if="showLoading" />
          <div v-if="showResultPanel" class="rounded-lg bg-gray-400 border-4 border-gray-600">
            <div class="py-2 px-4 bg-gray-600 flex items-center justify-between text-white">
              <span class="font-bold text-xs lg:text-sm">Waktu: {{ time }} detik</span>
              <button v-if="showDiagramButton" class="text-xs lg:text-sm bg-gray-700 border-4 border-gray-800 rounded-full py-1 px-2 hover:border-transparent hover:shadow-lg" :class="{ hidden: !resumeShow }" @click="resumeShow = !resumeShow">
                Diagram
              </button>
              <button class="text-xs lg:text-sm bg-gray-700 border-4 border-gray-800 rounded-full py-1 px-2 hover:border-transparent hover:shadow-lg" :class="{ hidden: resumeShow }" @click="resumeShow = !resumeShow">
                Kembali
              </button>
            </div>
            <div class="p-10">
              <div :class="{ hidden: !resumeShow }">
                <ol class="list-decimal space-y-2 text-sm">
                  <li v-for="sentence in summary" :key="sentence">
                    {{ sentence }}
                  </li>
                </ol>
              </div>
              <div class="flex items-center justify-center" :class="{ hidden: resumeShow }">
                <img :src="diagramImage" alt="diagram">
              </div>
            </div>
          </div>
        </div>
        <div v-if="showErrorCard" class="card mb-3">
          <h2 class="font-bold text-xl lg:text-3xl text-center">
            Ups, <span class="text-teal-500">Terjadi Masalah.</span>
          </h2>
          <p class="text-sm lg:text-lg text-center text-gray-600">
            Mohon maaf, silahkan dicoba lagi ya.
          </p>
          <img src="~/assets/images/warning.svg" alt="" class="w-1/2 mx-auto mt-10">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch ({ store, params }) {
    await store.dispatch('GET_BOOKS')
  },
  data: () => ({
    bookCollapsed: true,
    previewCollapsed: false,
    resumeShow: true,
    author: '',
    bookTitle: '',
    bookUrl: '',
    blobPdf: null,
    diagramImage: null,
    labelSelect: '-- Pilih --',
    labelFileName: 'Telusuri File',
    inputDisabled: false,
    summaryMode: 'choose',
    showIdleCard: true,
    showErrorCard: false,
    showPreviewCard: false,
    showSummaryButton: true,
    showResultCard: false,
    showLoading: true,
    showResultPanel: false,
    showDiagramButton: true,
    summary: [],
    time: null
  }),
  computed: {
    books () {
      return this.$store.state.books
    }
  },
  methods: {
    changeState (state) {
      switch (state) {
        case 'idle':
          this.inputDisabled = false
          this.showIdleCard = true
          this.showErrorCard = false
          this.showPreviewCard = false
          this.showResultCard = false
          this.showLoading = false
          this.showResultPanel = false
          break
        case 'error':
          this.inputDisabled = false
          this.showIdleCard = false
          this.showErrorCard = true
          this.showPreviewCard = false
          this.showResultCard = false
          this.showLoading = false
          this.showResultPanel = false
          break
        case 'preview':
          this.inputDisabled = false
          this.showIdleCard = false
          this.showErrorCard = false
          this.showPreviewCard = true
          this.showSummaryButton = true
          this.showResultCard = false
          this.showLoading = false
          this.showResultPanel = false
          break
        case 'loading':
          this.inputDisabled = true
          this.showIdleCard = false
          this.showErrorCard = false
          this.showPreviewCard = false
          this.showResultCard = true
          this.showLoading = true
          this.showResultPanel = false
          break
        case 'result':
          this.inputDisabled = false
          this.showIdleCard = false
          this.showErrorCard = false
          this.previewCollapsed = false
          this.showPreviewCard = true
          this.showSummaryButton = false
          this.showResultCard = true
          this.showLoading = false
          this.showResultPanel = true
          break
        default:
          break
      }
    },
    uploadPdf (e) {
      this.summaryMode = 'upload'
      this.author = ''
      this.bookUrl = e.target.files[0]
      this.bookTitle = this.bookUrl.name
      this.labelFileName = this.bookUrl.name
      this.blobPdf = URL.createObjectURL(this.bookUrl)
      this.previewCollapsed = true
      this.showDiagramButton = false
      this.changeState('preview')
    },
    chooseBook (book) {
      this.summaryMode = 'choose'
      this.bookCollapsed = true
      this.author = book.author
      this.diagramImage = book.diagram
      this.bookUrl = book.pathfile
      this.bookTitle = book.shortTitle
      this.labelSelect = book.shortTitle
      this.blobPdf = book.pathfile
      this.previewCollapsed = true
      this.showDiagramButton = true
      this.changeState('preview')
    },
    async uploadSummarizing () {
      const formData = new FormData()
      formData.append('pdf', this.bookUrl)
      this.changeState('loading')
      await this.$axios
        .$post('https://fandiarfa26.pythonanywhere.com/summarize', formData)
        .then((res) => {
          this.summary = res.summary
          this.time = res.time.toFixed(2)
          this.changeState('result')
        })
        .catch(err => console.log(err))
    },
    async chooseSummarizing () {
      const formData = new FormData()
      formData.append('pathfile', this.bookUrl)
      this.changeState('loading')
      await this.$axios
        .$post('https://fandiarfa26.pythonanywhere.com/summarize2', formData)
        .then((res) => {
          this.summary = res.summary
          this.time = res.time.toFixed(2)
          this.changeState('result')
        })
        .catch((err) => {
          console.log(err)
          this.changeState('error')
        })
    }
  }
}
</script>
<style lang="css">
  .avoid_clicks>* {
    pointer-events: none;
  }
</style>

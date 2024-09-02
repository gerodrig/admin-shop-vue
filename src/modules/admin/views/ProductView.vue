<template>
  <div class="px-5 py-2 bg-white rounded">
    <h1 class="text-3xl">
      Product: <small class="text-blue-500">{{ title }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 gap-5 px-5 bg-white sm:grid-cols-2">
    <div class="first-col">
      <!-- First part of the form -->
      <div class="mb-4">
        <label for="title" class="form-label">Title</label>
        <!-- <input
          v-model="title"
          v-bind="titleAttrs"
          type="text"
          id="title"
          :class="[
            'form-control',
            {
              'border-red-500': errors.title,
            },
          ]"
        />
        <span v-if="errors.title" class="text-red-500">{{ errors.title }}</span> -->
        <CustomInput v-model="title" v-bind="titleAttrs" :error="errors.title" />
      </div>

      <div class="mb-4">
        <label for="slug" class="form-label">Slug</label>
        <!-- <input
          type="text"
          id="slug"
          :class="[
            'form-control',
            {
              'border-red-500': errors.slug,
            },
          ]"
        /> -->
        <CustomInput v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
      </div>

      <div class="mb-4">
        <label for="description" class="form-label">Description</label>
        <CustomTextArea
          v-model="description"
          v-bind="descriptionAttrs"
          :error="errors.description"
          type="text"
        />
      </div>

      <div class="flex flex-row gap-3">
        <div class="flex-1 mb-4">
          <label for="price" class="form-label">Price</label>
          <CustomInput v-model.number="price" v-bind="priceAttrs" :error="errors.price" />
        </div>

        <div class="flex-1 mb-4">
          <label for="stock" class="form-label">Stock</label>
          <CustomInput v-model.number="stock" v-bind="stockAttrs" :error="errors.stock" />
        </div>
      </div>

      <div class="mb-4">
        <label for="sizes" class="form-label">Sizes</label>
        <!-- <button type="button" class="p-2 mr-2 bg-blue-100 rounded w-14">XS</button>
        <button type="button" class="p-2 mr-2 text-white bg-blue-500 rounded w-14">
          S
        </button>
        <button type="button" class="p-2 mr-2 text-white bg-blue-500 rounded w-14">
          M
        </button> -->
        <div class="flex">
          <button
            v-for="size of allSizes"
            @click="toggleSize(size)"
            :key="size"
            type="button"
            :class="[
              'flex-1 p-2 mr-2 rounded- w-14',
              {
                'bg-blue-100': !hasSize(size),
                'bg-blue-500 text-white': hasSize(size),
              },
            ]"
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <!-- Second column -->
    <div class="first-col">
      <label for="stock" class="form-label">Images</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded">
        <div v-for="image of images" :key="image" class="flex-shrink-0">
          <img :src="image.value" :alt="title" class="w-[250px] h-[250px] rounded" />
        </div>

        <!-- Temp images -->
        <div v-for="imageFile of imageFiles" :key="imageFile.name" class="flex-shrink-0">
          <img :src="temporalImageUrl(imageFile)" :alt="title" class="w-[250px] h-[250px] rounded" />
        </div>
    
      </div>
      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Upload image</label>

        <input multiple type="file" id="image" class="form-control" accept="image/*" @change="onFileChanged"/>
      </div>

      <div class="mb-4">
        <label for="stock" class="form-label">Gender</label>
        <!-- <select v-model="gender" v-bind="genderAttrs" class="form-control">
          <option value="">Select</option>
          <option value="kid">Kid</option>
          <option value="women">Woman</option>
          <option value="men">Man</option>
        </select> -->
        <CustomSelect
          v-model="gender"
          v-bind="genderAttrs"
          :options="['kid', 'men', 'women']"
          :error="errors.gender"
        />
      </div>

      <!-- Save button -->
      <div class="my-4 text-right">
        <button
          :disabled="isPending"
          type="submit"
          class="px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:bg-gray-300 hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </form>

  <!-- <div class="grid grid-cols-2 mt-2 cols-2">
    <div class="p-2 bg-blue-200">
      {{ values }}
    </div>
    <div class="p-2 bg-red-200">
      {{ errors }}
    </div>
  </div> -->
</template>

<script src="./ProductView.ts" />

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>

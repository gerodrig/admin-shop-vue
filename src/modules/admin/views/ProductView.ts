import { defineComponent, watchEffect, watch, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMutation, useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';
import * as yup from 'yup';

import { createUpdateProductAction, getProductById } from '@/modules/products/actions';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import CustomSelect from '@/modules/common/components/CustomSelect.vue';
import { useToast } from 'vue-toastification';

const validationSchema = yup.object({
  title: yup.string().required().min(3),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required('Please select an option').oneOf(['men', 'women', 'kid']),
});

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
    CustomSelect,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const toast = useToast();

    //? VeeValidate Form
    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
    });
    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');
    const { fields: images } = useFieldArray<string>('images');

    const imageFiles = ref<File[]>([]);

    const onFileChanged = (e: Event) => {
        const fileInput = e.target as HTMLInputElement;
        const fileList = fileInput.files;

        if (!fileList || fileList.length === 0) return;

        for(const imageFile of fileList) {
            imageFiles.value.push(imageFile);
        }

    };

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);

      if (hasSize) {
        const index = currentSizes.indexOf(size);
        removeSize(index);
      } else {
        pushSize(size);
      }
    };

    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updatedProduct,
    } = useMutation({
      mutationFn: createUpdateProductAction,
    });

    const onSubmit = handleSubmit(async (values) => {

        const formValues = {
            ...values,
            images: [...values.images, ...imageFiles.value],
        };

      mutate(formValues);
    });

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/products');
        return;
      }
    });

    watch(
      product,
      () => {
        if (!product) return;

        resetForm({
          values: product.value,
        });

        imageFiles.value = [];
      },
      { deep: true, immediate: true },
    );

    watch(isUpdateSuccess, (value) => {
      if (!value) return;

      toast.success('Product updated successfully');

      //? Redirect to product details page
      router.replace(`/admin/products/${updatedProduct.value!.id}`);

      resetForm({
        values: updatedProduct.value,
      });
    });

    watch(
      () => props.productId,
      () => {
        refetch();
      },
      {
        immediate: true,
      },
    );

    return {
      //? Properties
      values,
      errors,
      meta,

      //? Form Fields
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      sizes,
      images,
      imageFiles,

      isPending,

      //? Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //? Actions
      onSubmit,
      toggleSize,
      onFileChanged,

      hasSize: (size: string) => sizes.value.map((s) => s.value).includes(size),
      temporalImageUrl: (imageFile: File) => URL.createObjectURL(imageFile),
    };
  },
});

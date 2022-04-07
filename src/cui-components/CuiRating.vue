<template>
  <div class="ui-block">
    <h3 class="ui-block-heading">Spinners</h3>

    <h4 class="ui-block-heading">Basic</h4>

    <div class="cui-example">
      <b-form-rating v-model="rating" />
    </div>

    <h4 class="ui-block-heading">Read-only</h4>

    <div class="cui-example">
      <b-form-rating v-model="rating" readonly />
    </div>

    <h4 class="ui-block-heading">Variants</h4>

    <div class="cui-example">
      <b-form-rating v-model="rating" variant="warning" class="mb-2" />
    <b-form-rating v-model="rating" variant="success" class="mb-2" />
    <b-form-rating v-model="rating" variant="danger" class="mb-2" />
    <b-form-rating v-model="rating" variant="primary" class="mb-2" />
    <b-form-rating v-model="rating" variant="info" />
    </div>

    <h4 class="ui-block-heading">Show value</h4>

    <div class="cui-example">
      <b-form-rating v-model="rating" show-value show-value-max />
    </div>

    <h4 class="ui-block-heading">Sizes</h4>

    <div class="cui-example">
      <b-form-rating v-model="rating" size="sm" class="mb-2" />
      <b-form-rating v-model="rating" size="lg" />
    </div>

    <h4 class="ui-block-heading">Number of stars</h4>

    <div class="cui-example">
      <b-form-rating v-model="rating10" stars="10" />
    </div>

    <h4 class="ui-block-heading">Inline</h4>

    <div class="cui-example">
      <b-form-rating inline v-model="rating" />
    </div>

    <h4 class="ui-block-heading">Borderless</h4>

    <div class="cui-example">
      <b-form-rating v-model="rating" no-border class="bg-transparent" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    rating: 4,
    rating10: 6
  })
}
</script>

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'availableQty',
      title: 'AvailableQty',
      type: 'number',
      validation: (rule: any) =>
        rule.custom((value: number) => {
          if (value < 0) {
            return 'Quantity cannot be negative'
          }
          if(value > 10){
            return 'Quantity cannot be more than 10'
          }

          return true
        }),
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
  ],
}

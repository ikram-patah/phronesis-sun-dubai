export const debriefs = [
  {
    id: 'week-8',
    title: 'Project 8: Add consent check to the payment flow',
    smiles: [
      `
            Easy to add to existing configuration. In the docs this feature has its own page,
            which makes it easy to follow (rather than just a reference).
            `
    ],
    confusings: [
      `It would be nice to have a default value if the feature is turned on without any
            additional i18n texting.`,
      `The docs could show an image preview of the feature.`,
      `Copiable code on their own should work out of the box. Now it does not work
            without the i18n code.`,
      `The links' styles are not consistent with the rest of instruments links (use
                primaryColor?)`
    ]
  },
  {
    id: 'week-9',
    title: 'Project 9: Online store',
    smiles: [
      `
            The Rebilly Instruments has a quantity modifier, which is a pleasant suprise.
            `
    ],
    confusings: [
      `The "create pricing plan" button in the product form is confusing and inconsistent
            with the rest of recomm. Instead of creating a pricing plan, the button is
            actually creating a product, which then redirects user to the pricing plan
            creation page. Suggestion: Change text to "Create product" and on success we can
            add message to create pricing plan.`,
      `Shipping amount is not working in instruments. It seems that the shippingAmount in
            preview purchase always returns 0.
            <br />
            We tried a few filters:
            <br />
            Invoice > Subtotal amount
            <br />
            Invoice > Items > Price
            <br />
            Invoice > Items > Product ID
            <br />
            Invoice > Items > Plan ID
            <br />
            When we turned off the condition for shipping, it did not work either.
            <br />
            We then tried to add order in recomm and its working only without any conditions
            in the filter list. The conditions added are not honoured.`,
      `The filter in shipping rates is also misleading.
            <br />
            The selector for applicable products and plans should be displayed at the top of
            the page instead of part of the filter list. We didn't even realize we needed to
            filter by products and plans until we were almost done with the project.`
    ]
  }
]

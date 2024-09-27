<template>
    <div class="container">
        <h2 class="pb-5 pt-2">Debriefs</h2>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Project 8: Add consent check to the payment flow
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <h3 class="pb-3">What made you smile?</h3>
                        <p>Easy to add to existing configuration. In the docs this feature has its own page, which makes it easy to follow (rather than just a reference). </p>
                        <h3 class="pb-3">What did you find confusing?</h3>
                        <ul>
                            <li class="list-item">It would be nice to have a default value if the feature is turned on without any additional i18n texting.</li>
                            <li class="list-item">The docs could show an image preview of the feature.</li>
                            <li class="list-item">Copiable code on their own should work out of the box. Now it does not work without the i18n code.</li>
                            <li class="list-item">The links' styles are not consistent with the rest of instruments links (use primaryColor?)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
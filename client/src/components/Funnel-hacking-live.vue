<template>
  <div class="container text-center bg-color">
    <div class="row">
      <div class="col-md-3 offset-md-5 my-5">
          <img class="img-fluid" src="/images/fhl/image.png" alt="FHL" />
      </div>
      <div class="col-md-12">
        <p class="grey-text" style="font-size: 24px;">THE 10TH (AND FINAL) FHL... GOING OUT WITH A BANG!</p>
        <p class="white-text" style="font-size:48px; font-weight: 900;">“SAVE YOUR SEAT FOR THE LAST DANCE OF
<span class="blue-text" style="font-size:82px; font-weight: 900;">FUNNEL HACKING LIVE X</span><br>
IN LAS VEGAS, NEVADA!”</p>
        <p class="white-text" style="font-size:22px">The Last (And Greatest) Marketing Event In The History of Marketing Events Is Happening On
          <span class="blue-text">
            February 12th - 15th, 2025
          </span>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
          <div class="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/1w7OgIMMRc4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
      </div>
    </div>

    <div class="row my-4">
      <div class="col-md-3">
        <img class="img-fluid" src="/images/fhl/ticket.png" alt="Ticket">
      </div>
      <div class="col-md-9 d-flex align-items-center">
        <p class="text-center white-text" style="font-size: 48px">
          Secure Your Ticket For Only <span class="blue-text">$997!</span>
        </p>
      </div>
    </div>

    <div class="row my-5">
      <div class="col-md-8 offset-md-2">
        <div class="card" style="min-height: 800px">
            <div class="card-body">
              <p>Funnel Hacking Live replays
                <input v-model="state.hasReplay" type="checkbox" name="" id="">
              </p>

              <p>
                Funnel Hacking Live partner plan
                <input v-model="state.hasPartner" type="checkbox" name="" id="">
                <br>
                <select v-if="state.hasPartner" v-model.number="state.numberOfPartners" name="" id="">
                  <option value="1">Number of partners: 1</option>
                  <option value="2">Number of partners: 2</option>
                  <option value="3">Number of partners: 3</option>
                </select>
              </p>

              <div class="rebilly-instruments"></div>
              <div class="rebilly-instruments-summary"></div>
            </div>
          </div>
      </div>
    </div>
  </div>
    <footer class="pt-5">
      <div class="d-flex flex-column flex-sm-row justify-content-center py-4 border-top align-items-center">
        <p class="white-text my-0">&copy; 2024 Phronesis Sun Dubai, Inc. All rights reserved.</p>
        <RouterLink :to="{ name: 'debriefs' }" class="btn btn-danger ms-4">
            Go to Debriefs
          </RouterLink>
      </div>
    </footer>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, watch } from 'vue'
import RebillyInstruments from '@rebilly/instruments'

const state = reactive({
  hasReplay: false,
  hasPartner: false,
  numberOfPartners: 1,
})

watch(() => state.hasReplay, (value) => {
  RebillyInstruments.destroy();

  if (value) {
    config.items.push(planReplays)
  } else {
    config.items = config.items.filter((item) => item.planId !== planReplays.planId)
  }

  RebillyInstruments.mount(config);
})

watch(() => state.hasPartner, (value) => {
  RebillyInstruments.destroy();

  if (value) {
    config.items.push(planPartner)
  } else {
    config.items = config.items.filter((item) => item.planId !== planPartner.planId)
  }
  RebillyInstruments.mount(config);
})

watch(() => state.numberOfPartners, (value) => {
  RebillyInstruments.destroy();

  const partner = config.items.find((item) => item.planId === planPartner.planId)
  partner.quantity = Number(value);

  RebillyInstruments.mount(config);
})

const planReplays = {
  planId: 'funnel-hacking-live-replays',
  quantity: 1,
  thumbnail: 'https://picsum.photos/100',
};

const planPartner = {
  planId: 'funnel-hacking-partner-plan',
  quantity: 1,
  thumbnail: 'https://picsum.photos/120',
};

const config = {
    organizationId: 'phronesis-sun-dubai',
    publishableKey: 'pk_sandbox_n6_C4CB3xxXxKfeLTcPSfSb4e2SCOE9iwh59PPF',
    websiteId: 'sun-dubai.ae',
    apiMode: 'sandbox',
    items: [
      {
        planId: 'funnel-hacking-live-plan',
        quantity: 1,
        thumbnail: 'https://picsum.photos/200',
      }
    ]
  }

onBeforeMount(() => {
  document.title = 'Funnel Hacking Live';
  document.body.classList.add('blue-background')
})

onBeforeUnmount(() => {
  document.body.classList.remove('blue-background')
})

onMounted(() => {
  RebillyInstruments.mount(config)
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}
.blue-background {
  background-color: rgb(20,27,40);
}

.blue-text {
  color: rgb(0, 176, 255);
}

.white-text {
  color: white;
}

.grey-text {
  color: #babbbd;
}
</style>
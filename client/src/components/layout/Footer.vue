<template>
  <div class="container">
    <footer class="pt-5">
      <div class="row">
        <div class="col-md-3 mb-4">
          <h5>Sitemap</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary"> Home </a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary"> Our team </a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary"> Our apartments </a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary"> Pricing </a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary"> FAQs </a>
            </li>
          </ul>
        </div>

        <div class="col-md-3 mb-4">
          <h5>Support our developer</h5>
          <div class="btn-group mt-2">
            <button type="button" class="btn btn-outline-secondary">One time</button>
            <button type="button" class="btn btn-outline-secondary">Monthly</button>
          </div>
          <div class="input-group mt-3">
            <span class="input-group-text">$</span>
            <input type="text" class="form-control form-control-sm" />
            <span class="input-group-text">USD</span>
          </div>
          <div class="mt-3">
            <button type="button" class="btn btn-primary">Dedicate this gift</button>
          </div>
        </div>

        <div class="col-md-5 offset-md-1 mb-3">
          <form>
            <h5>Subscribe to our newsletter</h5>
            <p>Monthly digest of what's new and exciting from us.</p>
            <div class="d-flex flex-column flex-sm-row w-100 gap-2">
              <label for="newsletter1" class="visually-hidden">Email address</label>
              <input
                id="newsletter1"
                type="text"
                class="form-control"
                placeholder="Email address"
              />
              <button class="btn btn-primary" type="button">Subscribe</button>
            </div>
          </form>
        </div>
      </div>

      <div class="d-flex flex-column flex-sm-row justify-content-between py-4 border-top">
        <p>&copy; 2024 Phronesis Sun Dubai, Inc. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

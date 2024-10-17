<template>
    <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <span class="fs-4 d-flex align-items-center mb-3 mb-md-0 me-md-auto">
        <img class="casino-logo" src="/images/casino/casino-logo.png" alt="Sundubai Casino">
      </span>

      <ul class="nav nav-pills">
        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link" activeClass="active">
            Home
          </RouterLink>
        </li>
      </ul>
    </header>
  </div>
</template>

<style lang="scss">
.casino-logo {
    max-width: 150px;
}
</style>
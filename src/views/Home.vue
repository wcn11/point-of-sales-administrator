<template>
  <div class="home">
    <div class="table-responsive overflow-hidden">
      <!-- <atom-spinner :animation-duration="1000" :size="60" :color="'#ff1d5e'" /> -->

      <div class="row d-flex">
        <!-- <VueContentLoading></VueContentLoading> -->
        <div
          class="col-md-3 card"
          style="width: 18rem"
          v-for="(database, index) in databases"
          :key="index"
        >
          <a
            href="javascript:void(0)"
            class="text-decoration-none text-dark"
            @click="getSessionId(database['id'])"
          >
            <img
              :src="database['logoUrl']"
              :style="`backgroundColor: #${database['bgColor']}`"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">{{ database["alias"] }}</h5>
              <small
                >Kadaluarsa: {{ database["expired"] ? "Ya" : "Tidak" }}</small
              >
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="javascript:void(0)" class="btn btn-primary"
                >Buka Database</a
              >
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { AtomSpinner } from "epic-spinners";
// import { VueContentLoading } from "vue-content-loading";

export default {
  name: "Home",
  components: {
    // AtomSpinner,
    // VueContentLoading,
  },
  data() {
    return {
      databases: [],
    };
  },
  methods: {
    getUsers() {
      return this.$http
        .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/db-lists`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
          },
        })
        .then((results) => {
          if (results["data"]["success"]) {
            console.log(results["data"]["data"]["s"]);
            this.databases = results["data"]["data"]["d"];
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.$alertify.error(error.response["data"]["data"]["d"]);
        });
    },
    getSessionId(id) {
      return this.$http
        .post(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/set-database-session/${id}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["data"]["s"]) {
            results["data"]["data"]["d"].map((value) => {
              this.$alertify.success(value);
            });
          }

          this.$router.push({
            path: `/database/user-lists`,
          });
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["data"]["d"]);
        });
    },
  },
  filters: {
    isActive(active) {
      return active === 1 || active === true ? "Aktif" : "Non-Aktif";
    },
  },
  created() {
    this.getUsers();
  },
};
</script>
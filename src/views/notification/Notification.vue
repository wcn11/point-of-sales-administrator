<template>
  <div class="home">
    <div class="wrapper">
      <header class="text-center">
        <h3>Notifikasi</h3>
      </header>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="m-auto">
          <button
            class="btn btn-info mr-1"
            id="btn-update-mass-price"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Buat Penawaran Produl Baru"
            @click="openModalAddProduct()"
          >
            <i class="fad fa-usd-circle"></i> Notifikasi Baru
          </button>
        </div>
      </div>
    </div>


    <form>
      <div class="form-row">

      <div class="form-group">
        <label for="inputAddress">Provinsi</label>
        <select class="form-control" id="inputCabang" v-model="selectedProvince" @change="getCities()">
          <option value="" disabled selected>Pilih Provinsi</option>
          <option
            v-for="(province, index) in provinces"
            :key="index"
            :value="province"
          >
            {{ province["name"] }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="inputAddress">Kota</label>
        <select class="form-control" id="inputCabang" v-model="selectedCity"  @change="getDistrict()">
          <option value="" disabled selected>Pilih Kota</option>
          <option
            v-for="(city, index) in cities"
            :key="index"
            :value="city"
          >
            {{ city["name"] }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="inputAddress">Kecamatan</label>
        <select class="form-control" id="inputCabang" v-model="selectedDistrict" @change="getSubDistrict()">
          <option value="" disabled selected>Pilih KEcamatan</option>
          <option
            v-for="(city, index) in districts"
            :key="index"
            :value="city"
          >
            {{ city["name"] }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="inputAddress">Keluran</label>
        <select class="form-control" id="inputCabang" v-model="selectedSubDistrict">
          <option value="" disabled selected>Pilih Kelurahan</option>
          <option
            v-for="(city, index) in sub_districts"
            :key="index"
            :value="city"
          >
            {{ city["nama"] }}
          </option>
        </select>
      </div>
      <div class="form-group text-center">
        <a href="javascript:void(0)" @click="notify()" class="btn btn-success"
          >Buat Notifikasi</a
        >
      </div>
      </div>
    </form>


  </div>
</template>

<script>
import $ from "jquery";
import moment from "moment";
moment.locale("id");

export default {
  name: "Notification",
  components: {},
  data() {
    return {
      user: [],
      provinces: [],
      cities: [],
      districts: [],
      sub_districts: [],

      selectedProvince: {},
      selectedCity: {},
      selectedDistrict: {},
      selectedSubDistrict: {},
    }
  },
  methods: {

    notify(){
      return this.$http
        .get(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/user/${this.$route.params.userId}`,
          {
            'province': this.selectedProvince,
            'city': this.selectedCity,
            'district': this.selectedDistrict,
            'sub_district': this.selectedSubDistrict,

          },{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            }
          },
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.$alertify.success("Berhasil")
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },

    getUser() {
      return this.$http
        .get(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/user/${this.$route.params.userId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.user = results["data"]["data"];
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },


    getProvince() {
      if(this.user){
        return this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/provinces-lists`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          })
          .then((results) => {
            if (results["data"]["success"]) {
              this.provinces = results["data"]["data"];

              // console.log(this.user['province_name'])

              this.selectedProvince['id'] = this.user['province_id']
              this.selectedProvince['name'] = this.user['province_name']
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["data"]["d"]);
          });
      }
      
    },
    getCities() {
      // if(this.selectedProvince['id']){
        return this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/cities-lists/${this.selectedProvince['id']}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          })
          .then((results) => {
            if (results["data"]["success"]) {
              if (results["data"]["data"]) {
                this.cities = results["data"]["data"];
              }
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
          });
      // }
    },
    getDistrict(){
        return this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/district-lists/${this.selectedCity['id']}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          })
          .then((results) => {
            if (results["data"]["success"]) {
              if (results["data"]["data"]) {
                this.districts = results["data"]["data"];
              }
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
          });
    },
    getSubDistrict(){
        return this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/subdistrict-lists/${this.selectedDistrict['id']}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          })
          .then((results) => {
            if (results["data"]["success"]) {
              if (results["data"]["data"]) {
                this.sub_districts = results["data"]["data"];
              }
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
          });
    },
  },
  created() {
    this.getUser();
    this.getProvince()

  },
};
</script>


<style scoped>
.conf-container {
  margin: auto;
}

.card-container {
  padding: 14px;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px gray;
  color: white;
}

.card-col {
  padding: 10px;
}

.card-col:hover {
  transform: scaleY(1.1);
  cursor: pointer;
}

.overflow-x-none {
  overflow-x: unset;
}
.price {
  font-size: 25px;
  font-weight: bold;
}

.sync-price {
  margin-right: 10px;
}

@media only screen and (max-width: 600px) {
  .table-responsive {
    overflow-x: auto;
  }
}
</style>

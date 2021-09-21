<template>
  <div class="home">

      <form class="needs-validation" novalidate>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationCustom01">First name</label>
      <input type="text" class="form-control" id="validationCustom01" value="Mark" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="validationCustom02">Last name</label>
      <input type="text" class="form-control" id="validationCustom02" value="Otto" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationCustom03">City</label>
      <input type="text" class="form-control" id="validationCustom03" required>
      <div class="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationCustom04">State</label>
      <select class="custom-select" id="validationCustom04" required>
        <option selected disabled value="">Choose...</option>
        <option>...</option>
      </select>
      <div class="invalid-feedback">
        Please select a valid state.
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationCustom05">Zip</label>
      <input type="text" class="form-control" id="validationCustom05" required>
      <div class="invalid-feedback">
        Please provide a valid zip.
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
      <label class="form-check-label" for="invalidCheck">
        Agree to terms and conditions
      </label>
      <div class="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>
  <button class="btn btn-primary" type="submit">Submit form</button>
</form>

  </div>
</template>

<script>
// @ is an alias to /src
// import $ from 'jquery'

export default {
  name: 'UserUpdate',
  components: {

  },
  data(){
    return {
      user: [],
    }
  },
  methods: {
    getUserById(){
      return this.$http.get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/users/${this.$route.params['id']}`,{
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("jwt-admin")
          }
      })
          .then(results => {
              console.log(results['data']['data'])
              if(results['data']['success']){
                this.user = results.data['data']
              }
          }).catch(error => {
              let status = error.response['status'] === 404 ? "Pengguna Tidak Ditemukan" : ""
                  this.$alertify.error(status)
              })
    },
    updateStatusUser(id){

      let status = this.users.filter(user => user['id'] === id)

      return this.$http.put(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/users`,{
        "user_id": id,
        "is_active": !status[0]['is_active']
      },{
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("jwt-admin")
          }
      })
          .then(results => {
            console.log(results)
              if(results['data']['success']){

                this.$alertify.success(results['data']['message'])
                
              }
          }).catch(error => {
              console.log(error.response)
                  this.$alertify.error(error.response['data']['message'])
              })
    },
  },
//   filters: {
//     isActive(active){

//       return active === 1 || active === true ? "Aktif" : "Non-Aktif"

//     }
//   },
  created(){
    this.getUserById()
  }
}
</script>

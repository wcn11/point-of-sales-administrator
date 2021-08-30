<template>
  <div class="home">

    <a href="/user/add">Tambah Mitra</a>
    <div class="table-responsive">
      <table class="table table-borderless table-hover">
        <thead>
          <tr class="text-nowrap">
            <th>Nama</th>
            <th>Cabang</th>
            <th>Gudang</th>
            <th>Status Aktif</th>
            <th>Admin</th>
            <th>Ubah Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="text-nowrap">
            <td>
              {{ user['name'] }}
            </td>
            <td>
              {{ user['branch_name'] }}
            </td>
            <td>
              {{ user['warehouse_name'] }}
            </td>
            <td>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" @click="updateStatusUser(user['id'])" :id="`switchActive-${user['id']}`" v-model="user['is_active']">
                <label class="custom-control-label" :for="`switchActive-${user['id']}`">{{ user['is_active'] | isActive }}</label>
              </div>
              
            </td>
            <td>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" @click="updateStatusAdmin(user['id'])" :id="`switch-${user['id']}`" v-model="user['is_admin']">
                <label class="custom-control-label" :for="`switch-${user['id']}`">{{ user['is_admin'] | isActive }}</label>
              </div>
              
            </td>
            <td>
              <button @click="editUser(user['id'])" type="button" class="btn btn-outline-warning">ubah</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import $ from 'jquery'

export default {
  name: 'Home',
  components: {

  },
  data(){
    return {
      users: [],
    }
  },
  methods: {
    getUsers(){
      return this.$http.get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/users`,{
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("jwt-admin")
          }
      })
          .then(results => {
              if(results['data']['success']){
                this.users = results['data']['data']
              }
          }).catch(error => {
              console.log(error.response)
                  this.$alertify.error(error.response['data']['message'])
              })
    },
    editUser(id){
      
      this.$router.push({
          path: `/user/edit/${id}`
        }) 

    }, 
    updateStatusUser(id){

      let status = this.users.filter(user => user['id'] === id)

      return this.$http.put(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/users/active`,{
        "user_id": id,
        "is_active": !status[0]['is_active'],
        "is_admin": !status[0]['is_admin'],
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
    updateStatusAdmin(id){

      let status = this.users.filter(user => user['id'] === id)

      return this.$http.put(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/users/admin`,{
        "user_id": id,
        "is_admin": !status[0]['is_admin'],
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
  filters: {
    isActive(active){

      return active === 1 || active === true ? "Aktif" : "Non-Aktif"

    }
  },
  created(){
    this.getUsers()
  }
}
</script>

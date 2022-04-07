<template>
  <nav class=" bg-dark" style="opacity:90%; height:200px" >
    <div style="padding:15px;color:white" class="container-fluid d-flex flex-wrap justify-content-between text-center container-p-x pb-3">
      <div class="col-4 footer-a" style="text-align:right">
        <table>
          <thead>
            <th><h4 style="magin:20px">درباره ما</h4></th>
          </thead>
          <tr>
              <td>
                <a href="#">بلاگ</a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">امنیت سایت</a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">قوانین و مقررات</a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">تماس با ما</a>
            </td>
            </tr>
        </table>
      </div>
      <div class="col-4 cent footer-a" style="text-align:right">
        <table>
          <thead>
            <th><h4 style="magin:20px"> امکانات و خدمات</h4></th>
          </thead>
          <tr>
              <td>
                <a href="#">بلاگ</a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">امنیت سایت</a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">قوانین و مقررات</a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">تماس با ما</a>
            </td>
            </tr>
        </table>
      </div>

      <div class="col-3 cent footer-a" style="text-align:right">
        <table>
          <thead>
            <th><h4 style="magin:20px"> پشتیبانی</h4></th>
          </thead>
          <tr>
              <td>
                <a href="#">بلاگ</a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">امنیت سایت</a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">قوانین و مقررات</a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">تماس با ما</a>
            </td>
            </tr>
        </table>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-layout-footer',

  methods: {
  }
}
</script>
<style >
.cent{
  text-align: center;
}
.footer-a a{
  color:white;
}
.footer-a a:hover{
  color:grey;
}
</style>

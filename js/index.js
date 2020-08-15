let datas = [{
  name: '王1',
  card: '201713541031',
  money: 100
},{
  name: '王2',
  card: '201713541032',
  money: 200
},{
  name: '王3',
  card: '201713541033',
  money: 300
},{
  name: '王4',
  card: '201713541034',
  money: 400
},{
  name: '王5',
  card: '201713541035',
  money: 500
},{
  name: '王6',
  card: '201713541036',
  money: 600
}];
let perPage = 5; // 一页多少条
let totalPage; // 总共多少页
let currentPage = 1; // 当前页（默认1页）

// 相当于onload方法
$(function () {
  initTableData();
  deleteInfo();
  addInfo();
  editInfo();
  initPage();
  pageEvent();
});

// 初始化表格数据
function initTableData() {
  let start = (currentPage-1)*5; // 从第几条开始
  let end = start + perPage; // 从第几条结束（不包含当前条）
  $('#table-tbody').html('');
  for (let i = start; i<end && i<datas.length; i++) { // 最大不能超过数组长度
    $('#table-tbody').append(`
    <tr>
      <td>${datas[i].name}</td>
      <td>${datas[i].card}</td>
      <td>${datas[i].money}</td>
      <td>
        <i class="glyphicon glyphicon-trash del-icon"  data-index="${i}"></i>
        <i class="glyphicon glyphicon-edit edit-icon" data-index="${i}"></i>
      </td>
    </tr>
    `);
  }
}

// 删除操作
function deleteInfo() {
  $('#table-tbody').on('click','.del-icon',function () {
    let index = $(this).attr('data-index');
    for (let i = 0; i<datas.length; i++) {
      if (i == index) {
        datas.splice(i,1);
        initPage(); // 确定totalPage
        if(currentPage > totalPage){
          currentPage = totalPage;
        }
        initTableData();
        initPage();
        break;
      }
    }
  })
}

// 添加操作
function  addInfo() {
  $('#add-btn').on('click',function () {
    $('#add-modal').modal('show');
    $('#add-name').val('');
    $('#add-card').val('');
    $('#add-money').val('');
  })
  $('#determine-add').on('click',function () {
    let name = $('#add-name').val();
    let card = $('#add-card').val();
    let money = $('#add-money').val();
    let tempObj = {};
    tempObj.name = name;
    tempObj.card = card;
    tempObj.money = +money;
    datas.push(tempObj);
    $('#add-modal').modal('hide');
    initTableData();
    initPage();
  })

}

// 修改操作
function editInfo() {
  $('#table-tbody').on('click','.edit-icon',function () {
    let index = $(this).attr('data-index');
    for (let i = 0; i<datas.length; i++) {
      if (i == index) {
        $('#edit-modal').modal('show');
        $('#edit-name').val(datas[i].name);
        $('#edit-card').val(datas[i].card);
        $('#edit-money').val(datas[i].money+'');
        break;
      }
    }
    // 点击确定修改按钮
    $('#determine-edit').on('click',function () {
      for (let i = 0; i<datas.length; i++) {
        if (i == index) {
          datas[i].name = $('#edit-name').val();
          datas[i].card = $('#edit-card').val();
          datas[i].money = +$('#edit-money').val();
          break
        }
      }
      initTableData();
      $('#edit-modal').modal('hide');
    })
  })
}

// 初始化分页
function initPage() {
  totalPage = Math.ceil(datas.length/perPage);
  $('.pagination').html('');
  for (let i = 1; i<=totalPage; i++) {
    if(i == currentPage){
      $('.pagination').append(`
        <li class="active"><a href="#">${i}</a></li>
      `)
    }else{
      $('.pagination').append(`
        <li><a href="#">${i}</a></li>
      `)
    }
  }
}
// 点击页码切换显示
function pageEvent() {
  $('.pagination').on('click','li',function () {
    currentPage = +$(this)[0].children[0].innerText;
    initTableData();
    initPage();
  })
}

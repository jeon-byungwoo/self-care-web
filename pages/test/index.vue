<script type="text/javascript">
function filter() {
  var search,
    list,
    i,
    res = ''

  search = document.getElementById('search').value.toUpperCase() // input tag의 value 값 취득

  if (search != '') {
    list = document.getElementById('list').innerHTML.split('<br>') // list를 배열로 변환
    list[list.length - 1] = list[list.length - 1].split('</p>')[0]

    for (i = 1; i < list.length; i++) {
      if (list[i].toUpperCase().includes(search)) {
        res += list[i].replaceAll('&nbsp;', ' ') + '\n' // 검색 결과를 변수에 저장
      }
    }
    if (res == '') res = '해당 검색결과가 없습니다.'
  }
  document.getElementById('filter_result').innerText = res // 검색 결과 출력
}
</script>

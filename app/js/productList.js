import $ from 'jquery';

// 获取课程数据
export function getProductDate(pageNo=1,psize=20,type=10){
	$.get('http://study.163.com/webDev/couresByCategory.htm', {pageNo:pageNo, psize:psize, type:type},function(data){
		let datas = JSON.parse(data);
		$('#content').html('');
		for(let i = 0; i < datas.list.length; i++){
			let li = `<li>
						<div class="course">
							<img src="${datas.list[i].middlePhotoUrl}" alt="课程封面">
							<h6>${datas.list[i].name}</h6>
							<p>${datas.list[i].provider}</p>
							<p class="p-two"><span></span><span>${datas.list[i].learnerCount}</span></p>
							<p class="p-three">${datas.list[i].price == 0 ? '免费' : "¥" + datas.list[i].price}</p>
						</div>
						<a class="course-details" href="#">
							<div class="clearfix">
								<img src="${datas.list[i].middlePhotoUrl}" alt="课程封面">
								<div class="details">
									<h6>${datas.list[i].name}</h6>
									<p class="p-number"><span></span><span>${datas.list[i].learnerCount}</span>人在学</p>
									<p>发布者：${datas.list[i].provider}</p>
									<p class="p-three">分类：${datas.list[i].categoryName}</p>
								</div>
							</div>
							<p>${datas.list[i].description}</p>
						</a>
					</li>`;
			$('#content').append(li);
		};
	});
};

// 获取热门排行数据
export function getHotDate(){
	$.get('http://study.163.com/webDev/hotcouresByCategory.htm',function(data){
		let hotdata = JSON.parse(data);
		$('#hot ul').html('');
		for(let i = 0; i < hotdata.length; i++){
			let li = `<li>
						<a href="#">
							<img src="${hotdata[i].middlePhotoUrl}" alt="热门封面">
							<div>
								<h6>${hotdata[i].name}</h3>
								<p><span></span>${hotdata[i].learnerCount}</p>
							</div>
						</a>
					</li>`;
			$('#hot ul').append(li);
		};
	});
}

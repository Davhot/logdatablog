// Если отключить анимацию, то загруженность цп минимальна
$(document).ready(function () {

	$("#cool-bg").css({'width': window.innerWidth, 'height': window.innerHeight})
	var sizeMapX = $("#cool-bg").width()
	var sizeMapY = $("#cool-bg").height()
	var draw = SVG('cool-bg').size(sizeMapX, sizeMapY)
	draw.rect(sizeMapX, sizeMapY).fill('#eee')

	map = new Map(sizeMapX, sizeMapY, draw, datum)
	map.run()

	$(window).resize(function () {
		location.reload();
	})
});


// [ [количество точек, описание точек для ломаной], ... ]
// требования: линии должны быть вертикальными или горизонтальными и координаты кратны 5
// var datum = [ [4, [0, 0], [0, 40], [40, 40]],
// 			 [2, [10, 10], [10, 30]],
// 			 [10, [0, 50], [90, 50], [90, 60], [0, 60]]]

// var datum = [[1, [4, 6], [6, 6], [6, 4], [14, 4]],
//  [4, [4, 8], [8, 8], [8, 6], [16, 6], [16, 4], [56, 4]],
//  [2, [4, 12], [18, 12], [18, 10], [32, 10]],
//  [1, [4, 16], [8, 16], [8, 14]]]
//var datum = [[2, [8, 12], [12, 12], [12, 8], [28, 8]], [4, [8, 16], [16, 16], [16, 12], [32, 12], [32, 8], [92, 8]], [2, [8, 20], [36, 20], [36, 16], [64, 16]], [4, [8, 32], [16, 32], [16, 24], [8, 24], [8, 28], [12, 28]], [1, [40, 12], [68, 12]], [1, [8, 36], [20, 36], [20, 32], [24, 32]], [4, [12, 44], [20, 44], [20, 40], [24, 40], [24, 36], [32, 36], [32, 32], [28, 32], [28, 28], [44, 28], [44, 20], [68, 20], [68, 16], [72, 16], [72, 12], [92, 12]], [3, [48, 24], [48, 28], [52, 28], [52, 32], [40, 32], [40, 36], [68, 36]], [1, [52, 24], [68, 24]], [1, [72, 24], [76, 24], [76, 16]], [2, [80, 20], [92, 20], [92, 24]], [1, [80, 28], [92, 28]], [3, [60, 28], [56, 28], [56, 32], [76, 32], [76, 36], [72, 36], [72, 40], [40, 40], [40, 44], [36, 44]], [2, [84, 32], [80, 32], [80, 40], [76, 40]], [3, [24, 44], [28, 44], [28, 48], [12, 48], [12, 52], [32, 52], [32, 56], [28, 56], [28, 60], [8, 60], [8, 64], [16, 64], [16, 68], [8, 68]], [2, [16, 40], [8, 40], [8, 56], [24, 56]], [2, [44, 44], [92, 44]], [2, [40, 48], [56, 48]], [2, [36, 52], [52, 52]], [3, [92, 32], [92, 36], [84, 36], [84, 40]], [3, [60, 48], [60, 60], [36, 60], [36, 56], [56, 56], [56, 52]], [2, [88, 48], [64, 48], [64, 52], [72, 52], [72, 56], [76, 56]], [1, [80, 52], [92, 52]], [2, [84, 56], [88, 56], [88, 60]], [4, [80, 56], [80, 64], [84, 64], [84, 68], [68, 68], [68, 76]], [2, [88, 64], [92, 64], [92, 68]], [2, [76, 72], [92, 72]], [4, [32, 64], [24, 64], [24, 72], [36, 72], [36, 76], [28, 76], [28, 80], [8, 80]], [2, [36, 64], [48, 64], [48, 68], [28, 68]], [1, [52, 64], [52, 68], [60, 68]], [1, [56, 64], [72, 64]], [2, [64, 68], [64, 72], [44, 72], [44, 76], [60, 76]], [2, [64, 76], [64, 80], [44, 80]], [1, [8, 76], [20, 76]], [2, [8, 84], [28, 84]], [2, [72, 80], [92, 80]], [2, [36, 80], [40, 80], [40, 84], [68, 84]], [2, [72, 84], [92, 84]], [4, [32, 80], [32, 84], [36, 84], [36, 88], [40, 88], [40, 92], [44, 92], [60, 92], [60, 88], [68, 88]], [3, [8, 88], [8, 92], [12, 92], [12, 88], [28, 88]], [2, [16, 92], [36, 92]], [2, [44, 88], [56, 88]], [4, [64, 92], [72, 92], [72, 88], [92, 88], [92, 92], [76, 92]], [2, [40, 24], [24, 24], [24, 28]], [0, [4, 4], [96, 4], [96, 96], [4, 96], [4, 4]]]

var datum = [[2, [8, 12], [12, 12], [12, 8], [28, 8]],
  [2, [8, 16], [16, 16], [16, 12], [32, 12], [32, 8]],
  [2, [8, 20], [36, 20], [36, 16]],
  [3, [8, 32], [16, 32], [16, 24], [8, 24], [8, 28], [12, 28]],
  [2, [8, 36], [20, 36], [20, 32], [24, 32]],
  [4, [8, 44], [20, 44], [20, 40], [24, 40], [24, 36], [32, 36], [32, 32], [28, 32], [28, 28], [44, 28], [44, 20]],
  [2, [48, 24], [48, 32], [40, 32], [40, 36]],
  [2, [40, 40], [40, 44], [32, 44], [32, 40], [36, 40], [36, 32]],
  [2, [24, 44], [28, 44], [28, 48], [8, 48]],
  [1, [16, 40], [8, 40]],
  [2, [48, 16], [40, 16], [40, 24], [24, 24], [24, 28], [20, 28]],
  [2, [32, 48], [44, 48], [44, 44], [48, 44], [48, 40], [44, 40], [44, 36]],
  [2, [20, 16], [34, 16], [34, 8], [44, 8]],
  [0, [4, 4], [52, 4], [52, 52], [4, 52], [4, 4]]
]

class Polyline {
	constructor(vertexes, points, draw, pointSize, speed) {
		this.vertexes = vertexes
		this.str_vertexes = this.mas_to_str(vertexes)
		this.n_points = points
		this.points = []
		this.pointSize = pointSize
		this.translate = pointSize / 2
		this.speed = speed

		this.draw = draw
		// позиции точек
		this.poses = []
		// направления точек
		this.dirs = []
		// момент, когда можно выпускать точку
		this.is_move = [true]
		// блик для каждой точки
		this.blicks = []
		this.blick_size = 50

		for (var i = 0; i < points; i++) {
			this.poses.push(0)
			this.dirs.push(1)
			if (i > 0) {
				this.is_move.push(false)
			}
		}
	}

	draw_points () {
		for (var i = 0; i < this.n_points; i++) {

			// var bl = this.draw.polygon('50,0 52,48 100,50 52,52 50,100 48,52 0,50 48,48')
			// bl.fill('white').attr({opacity: 0}).scale(2.0, 2.0)
			// bl.filter(function(add) {
			//   add.gaussianBlur(4)
			// })

			var bl = this.draw.circle(this.blick_size)
			bl.fill('rgb(51,153,255)').attr({ opacity: 0 })
			bl.filter(function(add) {
			  add.gaussianBlur(7)
			})
			this.blicks.push(bl)

			this.points.push(this.draw.circle(this.pointSize).fill('#777')
				.move(this.vertexes[0][0] - this.translate, this.vertexes[0][1] - this.translate))
		}
	}

	move () {
		// var speed = []
		var speed_function = []
		for (var i = 0; i < this.n_points; i++) {
			if (this.is_move[i]) {
				var pos_before = this.poses[i]
				if(this.dirs[i] == 1) {
					this.poses[i] += 1
				} else {
					this.poses[i] -= 1
				}

				speed_function.push('-')
				if (this.poses[i] == 0 && this.dirs[i] == -1 ||
					this.poses[i] == this.vertexes.length - 1 && this.dirs[i] == 1) {
					speed_function[i] = '>'
				} else if (this.poses[i] == 1 && this.dirs[i] == 1 ||
					this.poses[i] == this.vertexes.length - 2 && this.dirs[i] == -1) {
					speed_function[i] = '<'
				}

				if (this.poses[i] == 0 || this.poses[i] == this.vertexes.length - 1) {
					this.dirs[i] *= -1
				}

			} else {
				// если предыдущая точка прошла полпути, то выпускать текущую
				if (this.poses[i - 1] > this.vertexes.length / 2 && this.is_move[i - 1]) {
					this.is_move[i] = true
				}
			}
		}
		// alert(this.poses)
		this.animate(speed_function)
	}

	animate (speed_function) {
		var polyline = this
		for (var i = 0; i < this.n_points; i++) {
			this.points[i].finish()
			// this.points[i].animate(this.speed, '-', 0)
			this.points[i]
			.animate(this.speed, speed_function[i], 0)
			.move(this.vertexes[this.poses[i]][0] - this.translate,
				this.vertexes[this.poses[i]][1] - this.translate)
		}
		if (this.n_points > 1){
			this.blick()
		}

	}

	blick() {
		for (var i = 0; i < this.n_points - 1; i++) {
			for (var j = i + 1; j < this.n_points; j++) {
				if (this.poses[i] == this.poses[j] && this.poses[i] != 0) {
					var bl = this.blicks[i]
					bl.finish()
					bl.move(this.vertexes[this.poses[i]][0] - this.blick_size / 2,
							this.vertexes[this.poses[i]][1] - this.blick_size / 2)
					bl.animate(300, '>', this.speed)
					.attr({ opacity: 0.5 })
					.animate(150, '<', 0)
					.attr({ opacity: 0 })
					// .delay(100).remove()
				} else if ((this.poses[i] - this.poses[j] == 1 && this.dirs[i] == -1 &&
					this.dirs[j] == 1 ||
					this.poses[i] - this.poses[j] == -1 && this.dirs[i] == 1 &&
					this.dirs[j] == -1) && this.poses[i] != 0 && this.poses[j] != 0){

					var pos = this.middle(this.vertexes[this.poses[i]], this.vertexes[this.poses[j]])

					var bl = this.blicks[i]
					bl.finish()
					bl.move(pos[0] - this.blick_size / 2, pos[1] - this.blick_size / 2)
					bl.animate(300, '>', this.speed * 1.25).attr({ opacity: 0.5 })
						.animate(150, '<', 0)
						.attr({ opacity: 0 })
					// .delay(100).remove()
				}
			}
		}
	}

	// отпределение того, вертикальный или горизонтальный отрезок, после чего
	// определение его длины, затем определение скорости на данном участке
	// calculate_speed (p1, p2) {
	// 	var dist = (Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2))
	// 	if (p1[0] == p2[0]) {
	// 		return this.speed * dist / this.dist_y
	// 	} else {
	// 		return this.speed * dist / this.dist_x
	// 	}
	// }

	middle (p1, p2) {
		if (p1[0] == p2[0]) {
			return [p1[0], p1[1] + (p2[1] - p1[1]) / 2]
		} else {
			return [p1[0] + (p2[0] - p1[0]) / 2, p1[1]]
		}
	}

	mas_to_str(mas) {
		var str = ""
		for (var i = 0; i < mas.length; i++) {
			str += mas[i][0] + ',' + mas[i][1] + ' '
		}
		return str
	}
}

class Map {
	constructor(sizeMapX, sizeMapY, svg_main_drow_object, datum = null) {
		this.DEFAULT_MAP_SIZE = 55
		this.POINT_SIZE = 8
		this.POLILINE_SIZE = 1
		// смещение из-за того, что окружность рисуется не в центре, а начиная с правого верхнего угла
		this.TRANSLATE = this.POINT_SIZE / 2
		this.scaleX = sizeMapX / this.DEFAULT_MAP_SIZE
		this.scaleY = sizeMapY / this.DEFAULT_MAP_SIZE

		this.datum = this.interpolation (datum)
		this.draw = svg_main_drow_object
		this.speed = 800

		// расстояния номинальных участков
		this.nominal_dist_x = this.POINT_SIZE * this.scaleX
		this.nominal_dist_y = this.POINT_SIZE * this.scaleY
		// Создание ломаных
		this.polylines = []

		for (var i = 0; i < this.datum.length; i++) {
			var vertexes = this.datum[i].slice(1, this.datum[i].length)
			var points = this.datum[i][0]
			// количество точек, вершины ломаной
			this.polylines.push(new Polyline(vertexes, points, this.draw, this.POINT_SIZE,
				this.speed))

		}

		this.draw_polylines()


		// debug interpolation
		// for(i = 0; i < this.polylines.length; i++) {
		// 	alert(this.polylines[i].str_vertexes)
		// 	alert(this.polylines[i].n_points)
		// }
	}

	run () {
		map = this
		setInterval(function() {
			for (var i = 0; i < map.polylines.length; i++){
				map.polylines[i].move()
			}
		}, this.speed)
	}

	draw_polylines () {
		// отрисовка ломаных
		for (var i = 0; i < this.polylines.length; i++){
			this.draw.polyline( this.polylines[i].str_vertexes ).fill('none')
				.stroke({ color: '#39f', width: this.POLILINE_SIZE,
					linecap: 'round', linejoin: 'round' })

			if (i != this.polylines.length - 1) {
				var border_circle_size = 12
				var half_b_c_s = border_circle_size / 2
				this.draw.circle(border_circle_size).fill('#39f')
					.move(this.polylines[i].vertexes[0][0] - half_b_c_s,
						this.polylines[i].vertexes[0][1] - half_b_c_s)

				this.draw.circle(this.POINT_SIZE).fill('white')
					.move(this.polylines[i].vertexes[0][0] - this.TRANSLATE,
						this.polylines[i].vertexes[0][1] - this.TRANSLATE)

				this.draw.circle(border_circle_size).fill('#39f')
				.move(this.polylines[i].vertexes[this.polylines[i].vertexes.length - 1][0] - half_b_c_s,
					this.polylines[i].vertexes[this.polylines[i].vertexes.length - 1][1] - half_b_c_s)

				this.draw.circle(this.POINT_SIZE).fill('white')
					.move(this.polylines[i].vertexes[this.polylines[i].vertexes.length - 1][0]
						- this.TRANSLATE,
						this.polylines[i].vertexes[this.polylines[i].vertexes.length - 1][1]
						- this.TRANSLATE)
			}

			this.polylines[i].draw_points()
		}

	}

	// интерполяция каждого отрезка с точностью размера точки
	interpolation (datum) {
		var dist_interval = this.POINT_SIZE / 2
		if (datum) {
			var data = [ ]
			for (var i = 0; i < datum.length; i++) {
				data.push([datum[i][0], [this.stx(datum[i][1][0]), this.sty(datum[i][1][1])] ])
				for (var j = 2; j < datum[i].length; j++) {
					// вертикальная интерполяция
					if ( datum[i][j - 1][0] == datum[i][j][0] ) {
						// вниз
						if (datum[i][j][1] - datum[i][j - 1][1] > 0){
							for (var k = datum[i][j - 1][1] + dist_interval;
							k < datum[i][j][1]; k += dist_interval) {
								data[i].push([this.stx(datum[i][j][0]), this.sty(k)])
							}
							data[i].push([this.stx(datum[i][j][0]), this.sty(datum[i][j][1])])
						// вверх
						} else {
							for (var k = datum[i][j - 1][1] - dist_interval;
							k > datum[i][j][1]; k -= dist_interval) {
								data[i].push([this.stx(datum[i][j][0]), this.sty(k)])
							}
							data[i].push([this.stx(datum[i][j][0]), this.sty(datum[i][j][1])])
						}

					// горизонтальная интерполяция вправо
					} else {
						// вправо
						if (datum[i][j][0] - datum[i][j - 1][0] > 0){
							for (var k = datum[i][j - 1][0] + dist_interval;
							k < datum[i][j][0]; k += dist_interval) {
								data[i].push([this.stx(k), this.sty(datum[i][j][1])])
							}
							data[i].push([this.stx(datum[i][j][0]), this.sty(datum[i][j][1])])
						// влево
						} else {
							for (var k = datum[i][j - 1][0] - dist_interval;
							k > datum[i][j][0]; k -= dist_interval) {
								data[i].push([this.stx(k), this.sty(datum[i][j][1])])
							}
							data[i].push([this.stx(datum[i][j][0]), this.sty(datum[i][j][1])])
						}
					}
				}
			}
			return data
		} else { return null }
	}

	// scale translate Ox
	stx (val) {
		return (val * this.scaleX + this.TRANSLATE)
	}
	// scale translate Oy
	sty (val) {
		return (val * this.scaleY + this.TRANSLATE)
	}
	/////////////////////////////////////////////////////
}

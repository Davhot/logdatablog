// Если отключить анимацию, то загруженность цп минимальна
$(document).ready(function () {
  if($("#cool-bg").length > 0) {
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
  }
});


// [ [количество точек, описание точек для ломаной], ... ]
// требования: линии должны быть вертикальными или горизонтальными и координаты кратны 5
// var datum = [ [4, [0, 0], [0, 40], [40, 40]],
// 			 [2, [10, 10], [10, 30]],
// 			 [10, [0, 50], [90, 50], [90, 60], [0, 60]]]

// для карты 56
// var datum = [[2, [8, 12], [12, 12], [12, 8], [28, 8]],
//  [2, [8, 16], [16, 16], [16, 12], [32, 12], [32, 8]],
//  [2, [8, 20], [36, 20], [36, 16]],
//  [1, [8, 32], [16, 32], [16, 24], [8, 24], [8, 28], [12, 28]],
//  [2, [8, 36], [20, 36], [20, 32], [24, 32]],
//  [4, [8, 44], [20, 44], [20, 40], [24, 40], [24, 36], [32, 36], [32, 32], [28, 32], [28, 28], [44, 28], [44, 20]],
//  [2, [48, 24], [48, 32], [40, 32], [40, 36]],
//  [2, [40, 40], [40, 44], [32, 44], [32, 40], [36, 40], [36, 32]],
//  [2, [24, 44], [28, 44], [28, 48], [8, 48]],
//  [1, [16, 40], [8, 40]],
//  [2, [48, 16], [40, 16], [40, 24], [24, 24], [24, 28], [20, 28]],
//  [2, [32, 48], [44, 48], [44, 44], [48, 44], [48, 40], [44, 40], [44, 36]],
//  [2, [20, 16], [34, 16], [34, 8], [44, 8]],
//  [0, [4, 4], [52, 4], [52, 52], [4, 52], [4, 4]]
//]

// для карты 40
var datum = [[2, [8, 12], [12, 12], [12, 8], [28, 8]],
  [2, [4, 8], [8, 8], [8, 4], [28, 4]],
  [2, [4, 12], [4, 16], [32, 16], [32, 12]],
  [1, [4, 28], [12, 28], [12, 20], [4, 20], [4, 24], [8, 24]],
  [2, [8, 36], [20, 36], [20, 32], [24, 32]],
  [2, [16, 12], [30, 12], [30, 4], [34, 4]],
  [3, [24, 36], [32, 36], [32, 32], [28, 32], [28, 28], [34, 28]],
  [4, [36, 24], [24, 24], [24, 28], [20, 28], [20, 20], [34, 20], [34, 8]],
  [3, [14, 28], [14, 20], [18, 20], [18, 32], [4, 32]],
  [0, [2, 2], [38, 2], [38, 38], [2, 38], [2, 2]]
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
		this.DEFAULT_MAP_SIZE = 40
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

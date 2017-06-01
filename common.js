///精确计算 加法
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
///精确计算 加法减法
function accSub(arg1, arg2) {
    return accAdd(arg1, -arg2);
}
///精确计算 乘法
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
///精确计算 除法
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
//暂时只验证了jqgrid的使用，
//合并上下行公共调用方法 gridName:jqgrid ID值，index:行索引
//注意，只传入index 未传入index2 合并index，index, index2都传入 合并index2 ，index 只是作为是否合并的参考列
function MergerGroup(gridName, index, index2) {
    if (index2) {
        var otrs = $("#" + gridName + " tr");
        var length = $("#" + gridName + " tr").length;
        for (var i = 0; i < length; i++) {
            //得到前一行的元素
            var befor = $(otrs[i]).children("td")[index2];
            //console.log($(befor).attr("rowspan"));
            var row = 1;
            for (var j = i + 1; j < length; j++) {
                //得到相对于前一行的后一行元素
                var end = $(otrs[j]).children("td")[index2];
                //比较 相对则row+1 不相等则退出本次循环
                if ($(befor).html() == $(end).html() && $($(otrs[j]).children("td")[index]).css("display") === "none") {
                    $(end).hide();
                    row++;
                }
                else {
                    i = j - 1;
                    break;
                }
            }
            $(befor).attr("rowspan", row);
        }
    } else {
        var otrs = $("#" + gridName + " tr");
        var length = $("#" + gridName + " tr").length;
        for (var i = 0; i < length; i++) {
            //得到前一行的元素
            var befor = $(otrs[i]).children("td")[index];
            //console.log($(befor).attr("rowspan"));
            var row = 1;
            for (var j = i + 1; j < length; j++) {
                //得到相对于前一行的后一行元素
                var end = $(otrs[j]).children("td")[index];
                //比较 相对则row+1 不相等则退出本次循环
                if ($(befor).html() == $(end).html()) {
                    $(end).hide();
                    row++;
                }
                else {
                    i = j - 1;
                    break;
                }
            }
            $(befor).attr("rowspan", row);
        }
    }
}


///生成随机数
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

///table 的changeInoutfocus  上下左右键改变输入框的焦点，
function chengeInputFocus(obj, evt) {
    var evt = (evt) ? evt : window.event
    var cell = $(obj).parents("td");
    var row = $(obj).parents("tr");
    var cellindex = cell[0].cellIndex;
    var rowindex = row[0].rowIndex;
    var tb = $(obj).parents("table");
    //left
    if (evt.keyCode == 37) {
        var result = true;
        while (result) {
            if (cell.prev("td").length == 0) {
                result = false;
            } else if (cell.prev("td").find("input").length > 0) {
                if (cell.prev("td").find("input").attr("disabled") == "disabled" || cell.prev("td").find("input").attr("readonly") == "readonly") {
                    cell = cell.prev("td");
                } else {
                    cell.prev("td").find("input").focus()
                    result = false;
                }
            } else {
                cell = cell.prev("td");
            }
        }
        //up
    } else if (evt.keyCode == 38) {
        var result = true;
        while (result) {
            if (row.prev("tr").length == 0) {
                result = false;
            } else if ($(row.prev("tr").find("td")[cellindex]).find("input").length > 0) {
                if ($(row.prev("tr").find("td")[cellindex]).find("input").attr("disabled") == "disabled" || $(row.prev("tr").find("td")[cellindex]).find("input").attr("readonly") == "readonly") {
                    row = row.prev("tr");
                } else {
                    $(row.prev("tr").find("td")[cellindex]).find("input").focus()
                    result = false;
                }
            } else {
                row = row.prev("tr");
            }
        }
        //right
    } else if (evt.keyCode == 39) {
        var result = true;
        while (result) {
            if (cell.next("td").length == 0) {
                result = false;
            } else if (cell.next("td").find("input").length > 0) {
                if (cell.next("td").find("input").attr("disabled") == "disabled" || cell.next("td").find("input").attr("readonly") == "readonly") {
                    cell = cell.next("td");
                } else {
                    cell.next("td").find("input").focus()
                    result = false;
                }
            } else {
                cell = cell.next("td");
            }
        }
    } else if (evt.keyCode == 40) {
		//down
        var result = true;
        while (result) {
            if (row.next("tr").length == 0) {
                result = false;
            } else if ($(row.next("tr").find("td")[cellindex]).find("input").length > 0) {
                if ($(row.next("tr").find("td")[cellindex]).find("input").attr("disabled") == "disabled" || $(row.next("tr").find("td")[cellindex]).find("input").attr("readonly") == "readonly") {
                    row = row.next("tr");
                } else {
                    $(row.next("tr").find("td")[cellindex]).find("input").focus()
                    result = false;
                }
            } else {
                row = row.prev("tr");
            }
        }
    }
}

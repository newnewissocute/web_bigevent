$(function(){
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
    // 获取文章分类列表
    function initArtCateList(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res){
                console.log(res)
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function(){
        var indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html(),
            area: ['500px', '300px']
        })
    })

    // 通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function(e){
        e.preventDefault()
        // console.log('ok')
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res){
                console.log(res)
                if(res.status !== 0){
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                // 根据索引，关闭弹出层
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null    
    // 通过代理的形式，为btn-edit按钮绑定点击事件
    $('tbody').on('click', '.btn-edit', function(e){
        // 弹出一个修改文章信息的层
        var indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
            area: ['500px', '300px']
        })
    
        var id = $(this).attr('data-id')
        // console.log(id)
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res){
                // console.log(res)
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式，为btn-edit按钮绑定点击事件    
    $('body').on('submit', '#form-edit', function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()                
            }
        })
    })

    // 通过代理的形式，为btn-delete按钮绑定点击事件    
$('tbody').on('click', '.btn-delete', function(){
    // console.log('ok')
    var id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('删除分类失败！')
                } 
                layer.msg('删除分类成功！')
                layer.close(index);
                initArtCateList()                
            }
        })

      });
})
})
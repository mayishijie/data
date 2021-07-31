package com.mayishijie.scala.scala.chapter01

/**
  * Author: Felix
  * Date: 2020/4/24
  * Desc: 这是Idea第一个HelloScala程序

  -object 名称
    从语法角度讲，上面语法表示声明了一个伴生对象
    Scala是纯面向对象的，去除了java中的static关键字，通过伴生对象模拟static效果
  -伴生对象
    *伴随类产生的一个对象
    *当我们对源文件进行编译之后，默认会生成两个字节码文件，一个是伴生类，另一个是伴生对象所属类
      其实真正的伴生对象是 伴生对象所属类中创建的单例的对象
    *如果不想默认生成伴生类，可以手动生成，要求伴生类名称和伴生对象名称一致

  -注意：以后在Scala语言中，如果要定义类似java的static内容，都应该放到伴生对象中声明

  ----------------------------------------------
  -对第一个Scala案例进行说明
    >object
        关键字，表示声明一个伴生对象
    >Scala01_HelloWorld
        伴生对象的名字，取名的时候需要符合标识符命名规则
    >def
        关键字  标识声明一个方法
    >main
        方法的名称
    >(args: Array[String])
      &args 参数名称
      &Array[String]参数类型,在Scala语言中，[]表示泛型
      &声明参数的时候，名称在前，类型在后，名称和类型之间用冒号分隔
    >Unit
      &返回值类型为空，相当于java语言中的void关键字
      &Unit是一个类型，当前类型只有一个实例()
      &参数列表和返回值类型之间，用冒号进行分隔
      &返回值类型和函数体之间用等号进行连接
    > println("HelloScala")
      向控制台打印输出内容
      在Scala语言中，语句结束不需要加分号
  */

object Scala01_HelloWorld {
  def main(args: Array[String]): Unit = {
    println("HelloScala")
    println(new Student().name)
    println(Student.bzr)
    args.size
  }
}

//伴生对象
/*object Student{
  var bzr:String = "xulaoshi"
}*/


//定义类
class Student{

  var name:String = _
  var age:Int = _
  //static bzr:String
}

object Student{
  var bzr:String = "xu"
}

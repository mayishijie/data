package com.mayishijie.scala.scala.chapter02

/**
  * Author: Felix
  * Date: 2020/4/25
  * Desc:  变量和常量
  *   -变量：在程序执行的过程中，其值可以改变
  *   -常量：在程序执行的过程中，其值不可以改变
  *   -Java
  *     >变量
  *       数据类型 变量名 = 值
  *       int a = 10
  *     >常量
  *       final 数据类型 变量名 = 值
  *
  *   -Scala
  *     >变量
  *       var 变量名:数据类型 = 值
  *       var a:Int = 10
  *     >常量
  *       val 变量名:数据类型 = 值
  */
object Scala02_Var {

  def main(args: Array[String]): Unit = {
    //声明一个整数类型的变量  a ，并将10赋值给a
    //var a:Int = 10
    //println(a)
    //（1）声明变量时，类型可以省略，编译器自动推导，即类型推导
    //var a = 10
    //println(a)
    //（2）类型确定后，就不能修改，说明Scala是强数据类型语言。
    //var a  = 10
    //a = "abc"
    //println(a)
    //（3）变量声明时，必须要有初始值
    //var a : Int

    //（4）在声明/定义一个变量时，可以使用var或者val来修饰，var修饰的变量可改变，val修饰的变量不可改。
    //var a = 10
    //val b = 20
    //a = 30
    //b = 40

    //（5）var修饰的对象引用可以改变，val修饰的对象则不可改变，但对象的状态（值）却是可以改变的。（比如：自定义对象、数组、集合等等）
    //var std1 = new Student()
    //std1 = new Student()
    //
    //val std2 = new Student()
    //std2.name = "lisi"
    ////std2 = new Student()

    //（6） 在实际开发的过程中，var和val优先选谁？
    //val 

    //var s:String = "abc"

}
}

//class Student{
//  var name:String = "zhangsan"
//}

package com.mayishijie.scala.scala.chapter06

/**
  * Author: Felix
  * Date: 2020/4/29
  * Desc: 存在继承关系，子类对象的创建过程
  */
object Scala10_TestExtends {
  def main(args: Array[String]): Unit = {
    //自动类型推导  不能推导出多态
    //val std: Person10 = new Student10() -->1,3
    //val std: Person10 = new Student10("jingjing",15,"00001")  -->1,3,4
    val std: Person10 = new Student10("jingjing",15,"00001")

    //println(std.name)
  }
}

class Person10{
  println("1-父类的主构造方法被调用了")

  var name:String = _
  var age:Int = _

  def this(name:String,age:Int){
    this()
    println("2-父类的辅助构造方法被调用了")
    this.name = name
    this.age = age
  }
}




class Student10(name:String,age:Int) extends Person10(name,age){
  println("3-子类的主构造方法被调用了")

  var stdNo:String = _

  def this(name:String,age:Int,stdNo:String){
    this(name,age)
    println("4-子类的辅助构造方法被调用了")
    this.stdNo = stdNo
  }
}
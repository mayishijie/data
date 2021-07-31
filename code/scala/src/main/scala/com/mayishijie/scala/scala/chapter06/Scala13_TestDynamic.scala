package com.mayishijie.scala.scala.chapter06

/**
  * Author: Felix
  * Date: 2020/4/30
  * Desc: 
  */
object Scala13_TestDynamic {
  def main(args: Array[String]): Unit = {
    /*
    val tt:Teacher13 = new Teacher13
    println(tt.name)//teacher
    tt.hello()//hello teacher
    */
    //在Scala语言中，不管是属性还是方法，都是动态绑定
    val tt:Person13 = new Teacher13
    println(tt.name)//teacher
    tt.hello()//hello teacher
    tt.age

  }
}

class Person13 {
  val name: String = "person"

  var age:Int = 18

  def hello(): Unit = {
    println("hello person")
  }
}

class Teacher13 extends Person13 {

  override val name: String = "teacher"

  override def hello(): Unit = {
    println("hello teacher")
  }
}

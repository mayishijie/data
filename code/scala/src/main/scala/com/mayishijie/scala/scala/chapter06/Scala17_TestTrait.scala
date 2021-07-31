package com.mayishijie.scala.scala.chapter06

/**
  * Author: Felix
  * Date: 2020/4/30
  * Desc:  特质的声明以及混入特质
  */
object Scala17_TestTrait {
  def main(args: Array[String]): Unit = {
    var a:PersonTraint17 = new MyClass17
    println(a.name)
    a.eat()
  }
}

//特质的声明
trait PersonTraint17{
  //抽象属性
  var name:String

  //抽象方法
  def eat():Unit

  //非抽象属性
  var age:Int = 10

  //非抽象方法

  def sleep(): Unit ={
    println("Person's sleep")
  }
}

//混入特质
class MyClass17 extends PersonTraint17{
  override var name: String = "atguigu"

  override def eat(): Unit = {
    println("mc eat")
  }
}

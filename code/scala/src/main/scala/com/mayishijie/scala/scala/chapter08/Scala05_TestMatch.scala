package com.mayishijie.scala.scala.chapter08

/**
  * Author: Felix
  * Date: 2020/5/5
  * Desc: 样例类
  */
case class Student(var name:String,var age:Int){}

object Scala05_TestMatch {
  def main(args: Array[String]): Unit = {
    var std1:Student = Student("jingjing",18)
    var res = std1 match {
      case Student("jingjing",28) =>"success"
      case _ =>"fail"
    }
    println(res)
  }
}

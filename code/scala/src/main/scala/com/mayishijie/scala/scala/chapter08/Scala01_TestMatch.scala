package com.mayishijie.scala.scala.chapter08

/**
  * Author: Felix
  * Date: 2020/5/5
  * Desc: 模式匹配实现  简单的两个整数运算
  */
object Scala01_TestMatch {
  def main(args: Array[String]): Unit = {
   /* var a:Int = 10
    var b:Int = 20
    var op:Char = '-'

    //模式匹配是有返回值
    //模式匹配中，没有break关键字，case分支执行结束之后， 直接跳出
    var res = op match {
      case '+' => a + b
      case '-' => a - b
      case '*' => a * b
      case '/' => a / b
      case _ => "运算符不合法"
    }
    println(res)
*/
    //通过模式守卫  求一个整数的绝对值
    def abs(num:Int): Int ={
      num match {
        case i:Int if i>=0 => i
        case j:Int if j < 0 => -j
      }
    }

    println(abs(-5))
  }
}

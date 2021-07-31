package com.mayishijie.scala.scala.chapter05

/**
  * Author: Felix
  * Date: 2020/4/29
  * Desc: 回顾闭包和柯里化
  */
object Scala12_ClosureAndCu {
  def main(args: Array[String]): Unit = {

   /* def f1(): Int =>Int ={
      var a:Int = 10
      def f2(b:Int): Int ={
        a + b
      }
      f2 _
    }*/

    //调用f1,返回的是f2
    //val ff: Int => Int = f1()
    //println(ff)
    //println(ff(20))

    //println(f1()(20))

    //柯里化
    def ff(a:Int)(b:Int):Int={
      a + b
    }

    //==> 柯里化 最后要转换的效果
   /*
   def ff1(a:Int) = {
      (b:Int)=> a + b
    }
    f1()
    */
  }
}

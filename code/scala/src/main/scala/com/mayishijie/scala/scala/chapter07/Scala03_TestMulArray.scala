package com.mayishijie.scala.scala.chapter07

/**
  * Author: Felix
  * Date: 2020/5/4
  * Desc: 多维数组
  */
object Scala03_TestMulArray {
  def main(args: Array[String]): Unit = {
    //创建二维数组
    val arr: Array[Array[Int]] = Array.ofDim[Int](2,3)
    arr(1)(0) = 20
    //对二维数组进行遍历
    for ( i <- 0 until arr.length;j <- 0 until(arr(i).length)){
      println(arr(i)(j))
    }

    //创建五维数组
    val newArrr: Array[Array[Array[Array[Array[Int]]]]] = Array.ofDim[Int](2,3,4,5,6)
  }
}

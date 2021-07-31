package com.mayishijie.scala.scala.chapter07

/**
  * Author: Felix
  * Date: 2020/5/4
  * Desc: 衍生集合
  */
object Scala10_TestFun {
  def main(args: Array[String]): Unit = {
    val list1 = List(1,2,3,4,5,6,7)
    val list2 = List(4,5,6,7,8,9,10,11,12)
    //（1）获取集合的头     1
    //println(list1.head)
    //（2）获取集合的尾（不是头的就是尾）    List(2, 3, 4, 5, 6, 7)
    //println(list1.tail)
    //（3）集合最后一个数据 7
    //println(list1.last)
    //（4）集合初始数据（不包含最后一个）
    //println(list1.init)
    //（5）反转
    //println(list1.reverse)
    //（6）取前（后）n个元素
    //println(list1.take(3))
    //println(list1.takeRight(3))
    //（7）去掉前（后）n个元素
    //println(list1.drop(3))
    //println(list1.dropRight(3))

    //（8）并集
    //val newList: List[Int] = list1.union(list2)
    //println(newList)
    //（9）交集
    //val newList: List[Int] = list1.intersect(list2)
    //（10）差集
    //val newList: List[Int] = list1.diff(list2)
    //val newList: List[Int] = list2.diff(list1)
    //println(newList)
    //（11）拉链
    //println(list1.zip(list2))
    //（12）滑窗
    for (elem <- list1.sliding(3,3)) {
      println(elem)
    }

  }
}

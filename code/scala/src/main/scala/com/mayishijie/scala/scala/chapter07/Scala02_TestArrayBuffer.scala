package com.mayishijie.scala.scala.chapter07

import scala.collection.mutable
import scala.collection.mutable.ArrayBuffer

/**
  * Author: Felix
  * Date: 2020/5/4
  * Desc: 可变数组
  *   可变数组，在执行添加或者删除操作的时候，不会创建新的数组对象，直接在源数组上进行操作
  */
object Scala02_TestArrayBuffer {
  def main(args: Array[String]): Unit = {
    //创建可变数组
    //val arr: ArrayBuffer[Int] = new ArrayBuffer[Int]()
    //val arr: ArrayBuffer[Int] = ArrayBuffer(1,2,3)

    //访问数组中的元素  对数组中的元素进行修改
    //arr(1) = 20
    //arr.update(1,30)
    //println(arr(1))

    //向数组中添加元素    建议：在操作集合的时候，不可变用符号，可变用方法
    //val newArr = arr. += (20)
    //arr.append(30)
    //arr.insert(1,50)

    //注意：并不是数组是可变的，在操作数组对象的时候，就不能创建新的数组对象了。  也可以调用相关的方法，去创建新的对象
    //val newArr: ArrayBuffer[Int] = arr.+:(30)
    //println(arr.mkString(","))
    //println(newArr.mkString(","))

    //删除数组中的元素
    //val num: Int = arr.remove(1)
    //println(num)

    //arr.remove(1,2)
    //println(arr.mkString(","))


    //可变数组转换为不可变数组
    val arr: ArrayBuffer[Int] = ArrayBuffer(1,2,3)
    val newArr: Array[Int] = arr.toArray

    //不可变数组转换为可变数组
    val buffer: mutable.Buffer[Int] = newArr.toBuffer

  }
}

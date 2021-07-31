package com.mayishijie.scala.scala.chapter06

/**
  * Author: Felix
  * Date: 2020/4/29
  * Desc: 访问权限
  */
object Scala07_TestPrivilege {
  def main(args: Array[String]): Unit = {
    val p: Person06 = new Person06
    println(p.age)
    println(p.sex)
    //println(p.idCard)  私有的，只能在本类中被访问
    //println(p.name)    受保护的，只能在本类以及子类中被访问
  }
}


class Student07 extends Person06{
  def f1(): Unit ={
    //println(idCard)   私有的，只能在本类中被访问
    println(name)
    println(age)
    println(sex)
  }
}